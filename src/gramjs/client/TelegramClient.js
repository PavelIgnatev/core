const os = require("os");
const Logger = require("../extensions/Logger");
const { sleep } = require("../Helpers");
const errors = require("../errors");
const MemorySession = require("../sessions/Memory");
const Helpers = require("../Helpers");
const utils = require("../Utils");
const Session = require("../sessions/Abstract");
const { LAYER } = require("../tl/AllTLObjects");
const { constructors, requests } = require("../tl");
const {
    ConnectionTCPObfuscated,
    MTProtoSender,
    UpdateConnectionState,
    HttpConnection,
} = require("../network");
const { authFlow, checkAuthorization } = require("./auth");
const { uploadFile } = require("./uploadFile");
const { updateTwoFaSettings, getTmpPassword } = require("./2fa");
const RequestState = require("../network/RequestState");
const Deferred = require("../Deferred").default;

const DEFAULT_DC_ID = 2;
const EXPORTED_SENDER_RECONNECT_TIMEOUT = 1000; // 1 sec
const EXPORTED_SENDER_RELEASE_TIMEOUT = 30000; // 30 sec

const PING_INTERVAL = 3000; // 3 sec
const PING_TIMEOUT = 5000; // 5 sec
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100; // ms

// An unusually long interval is a sign of returning from background mode...
const PING_INTERVAL_TO_WAKE_UP = 5000; // 5 sec
// ... so we send a quick "wake-up" ping to confirm than connection was dropped ASAP
const PING_WAKE_UP_TIMEOUT = 3000; // 3 sec
// We also send a warning to the user even a bit more quickly
const PING_WAKE_UP_WARNING_TIMEOUT = 1000; // 1 sec

const PING_DISCONNECT_DELAY = 60000; // 1 min

// All types
const sizeTypes = ["u", "v", "w", "y", "d", "x", "c", "m", "b", "a", "s", "f"];

class TelegramClient {
    static DEFAULT_OPTIONS = {
        connection: ConnectionTCPObfuscated,
        fallbackConnection: HttpConnection,
        useIPV6: false,
        proxy: undefined,
        timeout: 10,
        requestRetries: 5,
        connectionRetries: Infinity,
        connectionRetriesToFallback: 1000000000000,
        retryDelay: 1000,
        retryMainConnectionDelay: 10000,
        autoReconnect: true,
        sequentialUpdates: false,
        floodSleepLimit: 60,
        deviceModel: undefined,
        systemVersion: undefined,
        appVersion: undefined,
        langCode: "en",
        systemLangCode: "en",
        baseLogger: "gramjs",
        useWSS: false,
        additionalDcsDisabled: false,
        testServers: false,
        dcId: DEFAULT_DC_ID,
        shouldAllowHttpTransport: false,
        shouldForceHttpTransport: false,
        shouldDebugExportedSenders: false,
    };

    /**
     *
     * @param session {StringSession|LocalStorageSession}
     * @param apiId
     * @param apiHash
     * @param opts
     */
    constructor(
        session,
        apiId,
        apiHash,
        opts = TelegramClient.DEFAULT_OPTIONS
    ) {
        if (!apiId || !apiHash) {
            throw Error(
                'Your API ID or Hash are invalid. Please read "Requirements" on README.md'
            );
        }
        const args = { ...TelegramClient.DEFAULT_OPTIONS, ...opts };
        this.apiId = apiId;
        this.apiHash = apiHash;
        this.defaultDcId = args.dcId || DEFAULT_DC_ID;
        this._useIPV6 = args.useIPV6;
        this._shouldForceHttpTransport = args.shouldForceHttpTransport;
        this._shouldAllowHttpTransport = args.shouldAllowHttpTransport;
        this._shouldDebugExportedSenders = args.shouldDebugExportedSenders;
        // this._entityCache = new Set()
        if (typeof args.baseLogger === "string") {
            this._log = new Logger();
        } else {
            this._log = args.baseLogger;
        }
        // Determine what session we will use
        if (typeof session === "string" || !session) {
            try {
                throw new Error("not implemented");
            } catch (e) {
                session = new MemorySession();
            }
        } else if (!(session instanceof Session)) {
            throw new Error(
                "The given session must be str or a session instance"
            );
        }

        this.floodSleepLimit = args.floodSleepLimit;
        this._eventBuilders = [];

        this._phoneCodeHash = {};
        this.session = session;
        // this._entityCache = EntityCache();
        this.apiId = parseInt(apiId, 10);
        this.apiHash = apiHash;

        this._requestRetries = args.requestRetries;
        this._connectionRetries = args.connectionRetries;
        this._connectionRetriesToFallback = args.connectionRetriesToFallback;
        this._retryDelay = args.retryDelay || 0;
        this._retryMainConnectionDelay = args.retryMainConnectionDelay || 0;
        if (args.proxy) {
            this._log.warn("proxies are not supported");
        }
        this._proxy = args.proxy;
        this._timeout = args.timeout;
        this._autoReconnect = args.autoReconnect;

        this._connection = args.connection;
        this._fallbackConnection = args.fallbackConnection;
        if (typeof args.accountId !== "string") {
            throw new Error("Account Id not defined");
        }
        this._accountId = args.accountId;
        // TODO add proxy support

        this._floodWaitedRequests = {};

        this._initWith = (x) => {
            return new requests.InvokeWithLayer({
                layer: LAYER,
                query: new requests.InitConnection({
                    apiId: this.apiId,
                    deviceModel:
                        args.deviceModel || os.type().toString() || "Unknown",
                    systemVersion:
                        args.systemVersion || os.release().toString() || "1.0",
                    appVersion: args.appVersion || "1.0",
                    langCode: args.langCode,
                    langPack: "weba",
                    systemLangCode: args.systemLangCode,
                    query: x,
                    proxy: undefined, // no proxies yet.
                }),
            });
        };

        this._args = args;
        // These will be set later
        this._config = undefined;
        this.phoneCodeHashes = [];
        this._exportedSenderPromises = {};
        this._exportedSenderRefCounter = {};
        this._waitingForAuthKey = {};
        this._exportedSenderReleaseTimeouts = {};
        this._additionalDcsDisabled = args.additionalDcsDisabled;
        this._loopStarted = false;
        this._isSwitchingDc = false;
        this._destroyed = false;
        this._connectedDeferred = new Deferred();
    }

    // region Connecting

    /**
     * Connects to the Telegram servers, executing authentication if required.
     * Note that authenticating to the Telegram servers is not the same as authenticating
     * the app, which requires to send a code first.
     * @returns {Promise<void>}
     */
    async connect() {
        await this._initSession();

        if (this._sender === undefined) {
            // only init sender once to avoid multiple loops.
            this._sender = new MTProtoSender(this.session.getAuthKey(), {
                logger: this._log,
                dcId: this.session.dcId,
                retries: this._connectionRetries,
                retriesToFallback: this._connectionRetriesToFallback,
                shouldForceHttpTransport: this._shouldForceHttpTransport,
                shouldAllowHttpTransport: this._shouldAllowHttpTransport,
                delay: this._retryDelay,
                retryMainConnectionDelay: this._retryMainConnectionDelay,
                autoReconnect: this._autoReconnect,
                connectTimeout: this._timeout,
                authKeyCallback: this._authKeyCallback.bind(this),
                updateCallback: this._handleUpdate.bind(this),
                getShouldDebugExportedSenders:
                    this.getShouldDebugExportedSenders.bind(this),
                isMainSender: true,
                accountId: this._accountId,
            });
        }
        // set defaults vars
        this._sender.userDisconnected = false;
        this._sender._user_connected = false;
        this._sender.isReconnecting = false;
        this._sender._disconnected = true;

        const connection = new this._connection(
            this.session.serverAddress,
            this.session.port,
            this.session.dcId,
            this._log,
            this._args.testServers,
            false,
            this._accountId
        );
        const fallbackConnection = new this._fallbackConnection(
            this.session.serverAddress,
            this.session.port,
            this.session.dcId,
            this._log,
            this._args.testServers,
            false,
            this._accountId
        );

        const newConnection = await this._sender.connect(
            connection,
            undefined,
            fallbackConnection
        );
        if (!newConnection) {
            // we're already connected so no need to reset auth key.
            if (!this._loopStarted) {
                this._updateLoop();
                this._loopStarted = true;
            }
            return;
        }

        this.session.setAuthKey(this._sender.authKey);
        await this._sender.send(
            this._initWith(new requests.help.GetConfig({}))
        );

        if (!this._loopStarted) {
            this._updateLoop();
            this._loopStarted = true;
        }
        this._connectedDeferred.resolve();
        this._isSwitchingDc = false;
    }

    async _initSession() {
        await this.session.load();

        if (
            !this.session.serverAddress ||
            this.session.serverAddress.includes(":") !== this._useIPV6
        ) {
            const DC = utils.getDC(this.defaultDcId);
            // TODO Fill IP addresses for when `this._useIPV6` is used
            this.session.setDC(
                this.defaultDcId,
                DC.ipAddress,
                this._args.useWSS ? 443 : 80
            );
        }
    }

    setPingCallback(callback) {
        this.pingCallback = callback;
    }

    async setForceHttpTransport(forceHttpTransport) {
        this._shouldForceHttpTransport = forceHttpTransport;
        await this.disconnect();
        this._sender = undefined;
        await this.connect();
    }

    async setAllowHttpTransport(allowHttpTransport) {
        this._shouldAllowHttpTransport = allowHttpTransport;
        await this.disconnect();
        this._sender = undefined;
        await this.connect();
    }

    setShouldDebugExportedSenders(shouldDebugExportedSenders) {
        this._shouldDebugExportedSenders = shouldDebugExportedSenders;
    }

    getShouldDebugExportedSenders() {
        return this._shouldDebugExportedSenders;
    }

    async _updateLoop() {
        let lastPongAt;

        while (!this._destroyed) {
            await Helpers.sleep(PING_INTERVAL);
            if (this._sender.isReconnecting || this._isSwitchingDc) {
                lastPongAt = undefined;
                continue;
            }

            try {
                const ping = () => {
                    if (this._destroyed) {
                        return undefined;
                    }
                    return this._sender.send(
                        new requests.PingDelayDisconnect({
                            pingId: Helpers.getRandomInt(
                                Number.MIN_SAFE_INTEGER,
                                Number.MAX_SAFE_INTEGER
                            ),
                            disconnectDelay: PING_DISCONNECT_DELAY,
                        })
                    );
                };

                const pingAt = Date.now();
                const lastInterval = lastPongAt
                    ? pingAt - lastPongAt
                    : undefined;

                if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
                    await attempts(
                        () => timeout(ping, PING_TIMEOUT),
                        PING_FAIL_ATTEMPTS,
                        PING_FAIL_INTERVAL
                    );
                } else {
                    let wakeUpWarningTimeout = setTimeout(() => {
                        this._handleUpdate(
                            new UpdateConnectionState(
                                UpdateConnectionState.disconnected
                            )
                        );
                        wakeUpWarningTimeout = undefined;
                    }, PING_WAKE_UP_WARNING_TIMEOUT);

                    await timeout(ping, PING_WAKE_UP_TIMEOUT);

                    if (wakeUpWarningTimeout) {
                        clearTimeout(wakeUpWarningTimeout);
                        wakeUpWarningTimeout = undefined;
                    }

                    this._handleUpdate(
                        new UpdateConnectionState(
                            UpdateConnectionState.connected
                        )
                    );
                }

                lastPongAt = Date.now();
            } catch (err) {
                // eslint-disable-next-line no-console
                // console.warn(err);

                lastPongAt = undefined;

                if (this._sender.isReconnecting || this._isSwitchingDc) {
                    continue;
                }
                if (this._destroyed) {
                    break;
                }
                this._sender.reconnect();
            }

            // We need to send some content-related request at least hourly
            // for Telegram to keep delivering updates, otherwise they will
            // just stop even if we're connected. Do so every 30 minutes.

            if (Date.now() - this._lastRequest > 30 * 60 * 1000) {
                try {
                    await this.pingCallback();
                } catch (e) {
                    // we don't care about errors here
                }

                lastPongAt = undefined;
            }
        }
        await this.disconnect();
    }

    /**
     * Disconnects from the Telegram server
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (this._sender) {
            await this._sender.disconnect();
        }

        await Promise.all(
            Object.values(this._exportedSenderPromises)
                .map((promises) => {
                    return Object.values(promises).map((promise) => {
                        return (
                            promise &&
                            promise.then((sender) => {
                                if (sender) {
                                    return sender.disconnect();
                                }
                                return undefined;
                            })
                        );
                    });
                })
                .flat()
        );

        Object.values(this._exportedSenderReleaseTimeouts).forEach(
            (timeouts) => {
                Object.values(timeouts).forEach((releaseTimeout) => {
                    clearTimeout(releaseTimeout);
                });
            }
        );

        this._exportedSenderRefCounter = {};
        this._exportedSenderPromises = {};
        this._waitingForAuthKey = {};
    }

    /**
     * Disconnects all senders and removes all handlers
     * @returns {Promise<void>}
     */
    async destroy() {
        this._destroyed = true;

        try {
            await this.disconnect();
            this._sender.destroy();
        } catch (err) {
            // Do nothing
        }

        this.session.delete();
        this._eventBuilders = [];
    }

    async _switchDC(newDc) {
        this._log.info(`Reconnecting to new data center ${newDc}`);
        const DC = utils.getDC(newDc);
        this.session.setDC(newDc, DC.ipAddress, DC.port);
        // authKey's are associated with a server, which has now changed
        // so it's not valid anymore. Set to None to force recreating it.
        await this._sender.authKey.setKey(undefined);
        this.session.setAuthKey(undefined);
        this._isSwitchingDc = true;
        await this.disconnect();
        this._sender = undefined;
        return this.connect();
    }

    _authKeyCallback(authKey, dcId) {
        this.session.setAuthKey(authKey, dcId);
    }

    // endregion
    // export region

    async _cleanupExportedSender(dcId, index) {
        if (this.session.dcId !== dcId) {
            this.session.setAuthKey(undefined, dcId);
        }
        // eslint-disable-next-line no-console
        if (this._shouldDebugExportedSenders)
            console.log(`🧹 Cleanup idx=${index} dcId=${dcId}`);
        const sender = await this._exportedSenderPromises[dcId][index];
        delete this._exportedSenderPromises[dcId][index];
        delete this._exportedSenderRefCounter[dcId][index];
        await sender.disconnect();
    }

    async _cleanupExportedSenders(dcId) {
        const promises = Object.values(this._exportedSenderPromises[dcId]);
        if (!promises.length) {
            return;
        }

        if (this.session.dcId !== dcId) {
            this.session.setAuthKey(undefined, dcId);
        }

        this._exportedSenderPromises[dcId] = {};
        this._exportedSenderRefCounter[dcId] = {};

        await Promise.all(
            promises.map(async (promise) => {
                const sender = await promise;
                await sender.disconnect();
            })
        );
    }

    async _connectSender(sender, dcId, index, isPremium = false) {
        // if we don't already have an auth key we want to use normal DCs not -1
        let hasAuthKey = Boolean(sender.authKey.getKey());
        let firstConnectResolver;

        if (!hasAuthKey) {
            if (this._waitingForAuthKey[dcId]) {
                await this._waitingForAuthKey[dcId];

                const authKey = this.session.getAuthKey(dcId);
                await sender.authKey.setKey(authKey.getKey());
                hasAuthKey = Boolean(sender.authKey.getKey());
            } else {
                this._waitingForAuthKey[dcId] = new Promise((resolve) => {
                    firstConnectResolver = resolve;
                });
            }
        }

        const dc = utils.getDC(dcId, hasAuthKey);

        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                await sender.connect(
                    new this._connection(
                        dc.ipAddress,
                        dc.port,
                        dcId,
                        this._log,
                        this._args.testServers,
                        false,
                        this._accountId
                    ),
                    undefined,
                    new this._fallbackConnection(
                        dc.ipAddress,
                        dc.port,
                        dcId,
                        this._log,
                        this._args.testServers,
                        hasAuthKey ? isPremium : false,
                        this._accountId
                    )
                );

                if (this.session.dcId !== dcId && !sender._authenticated) {
                    this._log.info(
                        `Exporting authorization for data center ${dc.ipAddress}`
                    );
                    const auth = await this.invoke(
                        new requests.auth.ExportAuthorization({ dcId })
                    );

                    const req = this._initWith(
                        new requests.auth.ImportAuthorization({
                            id: auth.id,
                            bytes: auth.bytes,
                        })
                    );
                    await sender.send(req);
                    sender._authenticated = true;
                }

                sender.dcId = dcId;
                sender.userDisconnected = false;

                if (firstConnectResolver) {
                    firstConnectResolver();
                    delete this._waitingForAuthKey[dcId];
                }

                if (this._shouldDebugExportedSenders) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `✅ Connected to exported sender idx=${index} dc=${dcId}`
                    );
                }

                return sender;
            } catch (err) {
                if (this._shouldDebugExportedSenders) {
                    // eslint-disable-next-line no-console
                    console.error(
                        `☠️ ERROR! idx=${index} dcId=${dcId} ${err.message}`
                    );
                }
                // eslint-disable-next-line no-console
                console.error(err);

                await Helpers.sleep(1000);
                await sender.disconnect();
            }
        }
    }

    releaseExportedSender(sender) {
        const dcId = sender._dcId;
        const index = sender._senderIndex;

        if (!this._exportedSenderRefCounter[dcId]) return;
        if (!this._exportedSenderRefCounter[dcId][index]) return;

        this._exportedSenderRefCounter[dcId][index] -= 1;

        if (this._exportedSenderRefCounter[dcId][index] <= 0) {
            if (!this._exportedSenderReleaseTimeouts[dcId])
                this._exportedSenderReleaseTimeouts[dcId] = {};

            this._exportedSenderReleaseTimeouts[dcId][index] = setTimeout(
                () => {
                    // eslint-disable-next-line no-console
                    if (this._shouldDebugExportedSenders)
                        console.log(
                            `[CC] [idx=${index} dcId=${dcId}] 🚪 Release`
                        );
                    sender.disconnect();
                    this._exportedSenderReleaseTimeouts[dcId][index] =
                        undefined;
                    this._exportedSenderPromises[dcId][index] = undefined;
                },
                EXPORTED_SENDER_RELEASE_TIMEOUT
            );
        }
    }

    async _borrowExportedSender(
        dcId,
        shouldReconnect,
        existingSender,
        index,
        isPremium
    ) {
        if (this._additionalDcsDisabled) {
            return undefined;
        }

        const i = index || 0;

        if (!this._exportedSenderPromises[dcId])
            this._exportedSenderPromises[dcId] = {};
        if (!this._exportedSenderRefCounter[dcId])
            this._exportedSenderRefCounter[dcId] = {};

        if (!this._exportedSenderPromises[dcId][i] || shouldReconnect) {
            if (this._shouldDebugExportedSenders) {
                // eslint-disable-next-line no-console
                console.warn(
                    `🕒 Connecting to exported sender idx=${i} dc=${dcId}` +
                        ` ${shouldReconnect ? "(reconnect)" : ""}`
                );
            }
            this._exportedSenderRefCounter[dcId][i] = 0;
            this._exportedSenderPromises[dcId][i] = this._connectSender(
                existingSender || this._createExportedSender(dcId, i),
                dcId,
                index,
                isPremium
            );
        }

        let sender;
        try {
            sender = await this._exportedSenderPromises[dcId][i];

            if (!sender.isConnected()) {
                if (sender.isConnecting) {
                    await Helpers.sleep(EXPORTED_SENDER_RECONNECT_TIMEOUT);
                    return this._borrowExportedSender(
                        dcId,
                        false,
                        sender,
                        i,
                        isPremium
                    );
                } else {
                    return this._borrowExportedSender(
                        dcId,
                        true,
                        sender,
                        i,
                        isPremium
                    );
                }
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);

            return this._borrowExportedSender(
                dcId,
                true,
                undefined,
                i,
                isPremium
            );
        }

        this._exportedSenderRefCounter[dcId][i] += 1;
        if (!this._exportedSenderReleaseTimeouts[dcId])
            this._exportedSenderReleaseTimeouts[dcId] = {};
        if (this._exportedSenderReleaseTimeouts[dcId][i]) {
            clearTimeout(this._exportedSenderReleaseTimeouts[dcId][i]);
            this._exportedSenderReleaseTimeouts[dcId][i] = undefined;
        }

        return sender;
    }

    _createExportedSender(dcId, index) {
        return new MTProtoSender(this.session.getAuthKey(dcId), {
            logger: this._log,
            dcId,
            senderIndex: index,
            retries: this._connectionRetries,
            retriesToFallback: this._connectionRetriesToFallback,
            delay: this._retryDelay,
            retryMainConnectionDelay: this._retryMainConnectionDelay,
            shouldForceHttpTransport: this._shouldForceHttpTransport,
            shouldAllowHttpTransport: this._shouldAllowHttpTransport,
            autoReconnect: this._autoReconnect,
            connectTimeout: this._timeout,
            authKeyCallback: this._authKeyCallback.bind(this),
            isMainSender: dcId === this.session.dcId,
            isExported: true,
            updateCallback: this._handleUpdate.bind(this),
            getShouldDebugExportedSenders:
                this.getShouldDebugExportedSenders.bind(this),
            accountId: this._accountId,
            onConnectionBreak: () => this._cleanupExportedSender(dcId, index),
        });
    }

    getSender(dcId, index, isPremium) {
        return dcId
            ? this._borrowExportedSender(
                  dcId,
                  undefined,
                  undefined,
                  index,
                  isPremium
              )
            : Promise.resolve(this._sender);
    }

    _pickFileSize(sizes, sizeType) {
        if (!sizeType || !sizes || !sizes.length) {
            return undefined;
        }
        const indexOfSize = sizeTypes.indexOf(sizeType);
        let size;
        for (let i = indexOfSize; i < sizeTypes.length; i++) {
            size = sizes.find((s) => s.type === sizeTypes[i]);
            if (size) {
                return size;
            }
        }
        return undefined;
    }

    async invoke(request) {
        const randomDelay = Math.floor(Math.random() * 10000) + 2000;
        console.log(
            `Random delay ${randomDelay}ms before action execution: ${request.className}`
        );
        await new Promise((r) => setTimeout(r, randomDelay));

        if (request.classType !== "request") {
            throw new Error("You can only invoke MTProtoRequests");
        }

        let sender = this._sender;
        this._lastRequest = Date.now();

        await this._connectedDeferred.promise;

        const state = new RequestState(request, undefined);

        let attempt = 0;
        for (attempt = 0; attempt < this._requestRetries; attempt++) {
            sender.addStateToQueue(state);
            try {
                const result = await state.promise;
                state.finished.resolve();
                return result;
            } catch (e) {
                if (
                    e instanceof errors.ServerError ||
                    e.message === "RPC_CALL_FAIL" ||
                    e.message === "RPC_MCGET_FAIL"
                ) {
                    this._log.warn(
                        `Telegram is having internal issues ${e.constructor.name}`
                    );
                    await sleep(2000);
                } else if (
                    e instanceof errors.FloodWaitError ||
                    e instanceof errors.FloodTestPhoneWaitError
                ) {
                    if (e.seconds <= this.floodSleepLimit) {
                        this._log.info(
                            `Sleeping for ${e.seconds}s on flood wait`
                        );
                        await sleep(e.seconds * 1000);
                    } else {
                        state.finished.resolve();
                        throw e;
                    }
                } else if (
                    e instanceof errors.PhoneMigrateError ||
                    e instanceof errors.NetworkMigrateError ||
                    e instanceof errors.UserMigrateError
                ) {
                    throw new Error(`Phone migrated to ${e.newDc}`);
                } else if (e instanceof errors.MsgWaitError) {
                    await state.isReady();

                    state.after = undefined;
                } else if (e.message === "CONNECTION_NOT_INITED") {
                    throw new Error("CONNECTION_NOT_INITED");
                } else if (e instanceof errors.TimedOutError) {
                    throw new Error(e);
                } else {
                    state.finished.resolve();
                    throw e;
                }
            }

            state.resetPromise();
        }
        throw new Error(`Request was unsuccessful ${attempt} time(s)`);
    }

    setIsPremium(isPremium) {
        this.isPremium = isPremium;
    }

    async getMe() {
        try {
            return (
                await this.invoke(
                    new requests.users.GetUsers({
                        id: [new constructors.InputUserSelf()],
                    })
                )
            )[0];
        } catch (e) {
            this._log.warn("error while getting me");
            this._log.warn(e);
        }
        return undefined;
    }

    async start(authParams) {
        if (!this.isConnected()) {
            await this.connect();
        }

        if (
            await checkAuthorization(this, authParams.shouldThrowIfUnauthorized)
        ) {
            return;
        }

        const apiCredentials = {
            apiId: this.apiId,
            apiHash: this.apiHash,
        };

        await authFlow(this, apiCredentials, authParams);
    }

    uploadFile(fileParams) {
        return uploadFile(this, fileParams, this._shouldDebugExportedSenders);
    }

    updateTwoFaSettings(params) {
        return updateTwoFaSettings(this, params);
    }

    getTmpPassword(currentPassword, ttl) {
        return getTmpPassword(this, currentPassword, ttl);
    }

    // event region
    addEventHandler(callback, event) {
        this._eventBuilders.push([event, callback]);
    }

    _handleUpdate(update) {
        // this.session.processEntities(update)
        // this._entityCache.add(update)

        if (
            update instanceof constructors.Updates ||
            update instanceof constructors.UpdatesCombined
        ) {
            // TODO deal with entities
            const entities = [];
            for (const x of [...update.users, ...update.chats]) {
                entities.push(x);
            }
            this._processUpdate(update, entities);
        } else if (update instanceof constructors.UpdateShort) {
            this._processUpdate(update.update, undefined);
        } else {
            this._processUpdate(update, undefined);
        }
    }

    _processUpdate(update, entities) {
        update._entities = entities || [];
        const args = {
            update,
        };
        this._dispatchUpdate(args);
    }

    // endregion

    // region private methods

    /**
     Gets a full entity from the given string, which may be a phone or
     a username, and processes all the found entities on the session.
     The string may also be a user link, or a channel/chat invite link.

     This method has the side effect of adding the found users to the
     session database, so it can be queried later without API calls,
     if this option is enabled on the session.

     Returns the found entity, or raises TypeError if not found.
     * @param string {string}
     * @returns {Promise<void>}
     * @private
     */
    /* CONTEST
    async _getEntityFromString(string) {
        const phone = utils.parsePhone(string)
        if (phone) {
            try {
                for (const user of (await this.invoke(
                    new requests.contacts.GetContacts(0))).users) {
                    if (user.phone === phone) {
                        return user
                    }
                }
            } catch (e) {
                if (e.message === 'BOT_METHOD_INVALID') {
                    throw new Error('Cannot get entity by phone number as a ' +
                        'bot (try using integer IDs, not strings)')
                }
                throw e
            }
        } else if (['me', 'this'].includes(string.toLowerCase())) {
            return this.getMe()
        } else {
            const { username, isJoinChat } = utils.parseUsername(string)
            if (isJoinChat) {
                const invite = await this.invoke(new requests.messages.CheckChatInvite({
                    'hash': username,
                }))
                if (invite instanceof constructors.ChatInvite) {
                    throw new Error('Cannot get entity from a channel (or group) ' +
                        'that you are not part of. Join the group and retry',
                    )
                } else if (invite instanceof constructors.ChatInviteAlready) {
                    return invite.chat
                }
            } else if (username) {
                try {
                    const result = await this.invoke(
                        new requests.contacts.ResolveUsername(username))
                    const pid = utils.getPeerId(result.peer, false)
                    if (result.peer instanceof constructors.PeerUser) {
                        for (const x of result.users) {
                            if (x.id === pid) {
                                return x
                            }
                        }
                    } else {
                        for (const x of result.chats) {
                            if (x.id === pid) {
                                return x
                            }
                        }
                    }
                } catch (e) {
                    if (e.message === 'USERNAME_NOT_OCCUPIED') {
                        throw new Error(`No user has "${username}" as username`)
                    }
                    throw e
                }
            }
        }
        throw new Error(`Cannot find any entity corresponding to "${string}"`)
    }
    */
    // endregion

    // users region
    /**
     Turns the given entity into its input entity version.

     Most requests use this kind of :tl:`InputPeer`, so this is the most
     suitable call to make for those cases. **Generally you should let the
     library do its job** and don't worry about getting the input entity
     first, but if you're going to use an entity often, consider making the
     call:

     Arguments
     entity (`str` | `int` | :tl:`Peer` | :tl:`InputPeer`):
     If a username or invite link is given, **the library will
     use the cache**. This means that it's possible to be using
     a username that *changed* or an old invite link (this only
     happens if an invite link for a small group chat is used
     after it was upgraded to a mega-group).

     If the username or ID from the invite link is not found in
     the cache, it will be fetched. The same rules apply to phone
     numbers (``'+34 123456789'``) from people in your contact list.

     If an exact name is given, it must be in the cache too. This
     is not reliable as different people can share the same name
     and which entity is returned is arbitrary, and should be used
     only for quick tests.

     If a positive integer ID is given, the entity will be searched
     in cached users, chats or channels, without making any call.

     If a negative integer ID is given, the entity will be searched
     exactly as either a chat (prefixed with ``-``) or as a channel
     (prefixed with ``-100``).

     If a :tl:`Peer` is given, it will be searched exactly in the
     cache as either a user, chat or channel.

     If the given object can be turned into an input entity directly,
     said operation will be done.

     Unsupported types will raise ``TypeError``.

     If the entity can't be found, ``ValueError`` will be raised.

     Returns
     :tl:`InputPeerUser`, :tl:`InputPeerChat` or :tl:`InputPeerChannel`
     or :tl:`InputPeerSelf` if the parameter is ``'me'`` or ``'self'``.

     If you need to get the ID of yourself, you should use
     `get_me` with ``input_peer=True``) instead.

     Example
     .. code-block:: python

     // If you're going to use "username" often in your code
     // (make a lot of calls), consider getting its input entity
     // once, and then using the "user" everywhere instead.
     user = await client.get_input_entity('username')

     // The same applies to IDs, chats or channels.
     chat = await client.get_input_entity(-123456789)

     * @param peer
     * @returns {Promise<>}
     */

    /* CONTEST
    async getInputEntity(peer) {
        // Short-circuit if the input parameter directly maps to an InputPeer
        try {
            return utils.getInputPeer(peer)
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
        // Next in priority is having a peer (or its ID) cached in-memory
        try {
            // 0x2d45687 == crc32(b'Peer')
            if (typeof peer === 'number' || peer.SUBCLASS_OF_ID === 0x2d45687) {
                if (this._entityCache.has(peer)) {
                    return this._entityCache[peer]
                }
            }
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
        // Then come known strings that take precedence
        if (['me', 'this'].includes(peer)) {
            return new constructors.InputPeerSelf()
        }
        // No InputPeer, cached peer, or known string. Fetch from disk cache
        try {
            return this.session.getInputEntity(peer)
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
        // Only network left to try
        if (typeof peer === 'string') {
            return utils.getInputPeer(await this._getEntityFromString(peer))
        }
        // If we're a bot and the user has messaged us privately users.getUsers
        // will work with accessHash = 0. Similar for channels.getChannels.
        // If we're not a bot but the user is in our contacts, it seems to work
        // regardless. These are the only two special-cased requests.
        peer = utils.getPeer(peer)
        if (peer instanceof constructors.PeerUser) {
            const users = await this.invoke(new requests.users.GetUsers({
                id: [new constructors.InputUser({
                    userId: peer.userId,
                    accessHash: 0,
                })],
            }))
            if (users && !(users[0] instanceof constructors.UserEmpty)) {
                // If the user passed a valid ID they expect to work for
                // channels but would be valid for users, we get UserEmpty.
                // Avoid returning the invalid empty input peer for that.
                //
                // We *could* try to guess if it's a channel first, and if
                // it's not, work as a chat and try to validate it through
                // another request, but that becomes too much work.
                return utils.getInputPeer(users[0])
            }
        } else if (peer instanceof constructors.PeerChat) {
            return new constructors.InputPeerChat({
                chatId: peer.chatId,
            })
        } else if (peer instanceof constructors.PeerChannel) {
            try {
                const channels = await this.invoke(new requests.channels.GetChannels({
                    id: [new constructors.InputChannel({
                        channelId: peer.channelId,
                        accessHash: 0,
                    })],
                }))

                return utils.getInputPeer(channels.chats[0])
                // eslint-disable-next-line no-empty
            } catch (e) {
                console.log(e)
            }
        }
        throw new Error(`Could not find the input entity for ${peer.id || peer.channelId || peer.chatId || peer.userId}.
         Please read https://` +
            'docs.telethon.dev/en/latest/concepts/entities.html to' +
            ' find out more details.',
        )
    }
    */
    async _dispatchUpdate(
        args = {
            update: undefined,
        }
    ) {
        for (const [builder, callback] of this._eventBuilders) {
            const event = builder.build(args.update);
            if (event) {
                await callback(event);
            }
        }
    }

    isConnected() {
        if (this._sender) {
            if (this._sender.isConnected()) {
                return true;
            }
        }
        return false;
    }
}

function timeout(cb, ms) {
    let isResolved = false;

    return Promise.race([
        cb(),
        Helpers.sleep(ms).then(() =>
            isResolved ? undefined : Promise.reject(new Error("TIMEOUT"))
        ),
    ]).finally(() => {
        isResolved = true;
    });
}

async function attempts(cb, times, pause) {
    for (let i = 0; i < times; i++) {
        try {
            // We need to `return await` here so it can be caught locally
            // eslint-disable-next-line @typescript-eslint/return-await
            return await cb();
        } catch (err) {
            if (i === times - 1) {
                throw err;
            }

            await Helpers.sleep(pause);
        }
    }
    return undefined;
}

module.exports = TelegramClient;
