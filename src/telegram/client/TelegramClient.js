const os = require("os");
const Logger = require("../extensions/Logger");
const { sleep } = require("../Helpers");
const errors = require("../errors");
const Helpers = require("../Helpers");
const Session = require("../sessions/Abstract");
const { LAYER } = require("../tl/AllTLObjects");
const Api = require("../tl/api");
const { constructors, requests } = require("../tl");
const {
  ConnectionTCPObfuscated,
  MTProtoSender,
  UpdateConnectionState,
} = require("../network");

const RequestState = require("../network/RequestState");
const Deferred = require("../Deferred").default;

const DEFAULT_DC_ID = 2;
const PING_INTERVAL = 3000;
const PING_TIMEOUT = 5000;
const PING_FAIL_ATTEMPTS = 3;
const PING_FAIL_INTERVAL = 100;
const PING_INTERVAL_TO_WAKE_UP = 5000;
const PING_WAKE_UP_TIMEOUT = 3000;
const PING_WAKE_UP_WARNING_TIMEOUT = 1000;
const PING_DISCONNECT_DELAY = 60000;

class TelegramClient {
  static DEFAULT_OPTIONS = {
    connection: ConnectionTCPObfuscated,
    useIPV6: false,
    proxy: undefined,
    timeout: 10,
    requestRetries: 5,
    connectionRetries: Infinity,
    connectionRetriesToFallback: 1,
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
  };

  /**
   *
   * @param session {StringSession|LocalStorageSession}
   * @param apiId
   * @param apiHash
   * @param opts
   */
  constructor(session, apiId, apiHash, opts = TelegramClient.DEFAULT_OPTIONS) {
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
    // this._entityCache = new Set()
    if (typeof args.baseLogger === "string") {
      this._log = new Logger();
    } else {
      this._log = args.baseLogger;
    }
    // Determine what session we will use
    if (typeof session === "string" || !session) {
      throw new Error("not implemented");
    } else if (!(session instanceof Session)) {
      throw new Error("The given session must be str or a session instance");
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
    this._proxy = args.proxy;
    this._timeout = args.timeout;
    this._autoReconnect = args.autoReconnect;

    this._connection = args.connection;
    // TODO add proxy support

    this._floodWaitedRequests = {};

    this._initWith = (x) => {
      return new requests.InvokeWithLayer({
        layer: LAYER,
        query: new requests.InitConnection({
          apiId: this.apiId,
          deviceModel: args.deviceModel || os.type().toString() || "Unknown",
          systemVersion: args.systemVersion || os.release().toString() || "1.0",
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
    await this.session.load();

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
        updateCallback: this._handleUpdate.bind(this),
        isMainSender: true,
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
      this._proxy
    );

    const newConnection = await this._sender.connect(connection);

    if (!newConnection) {
      // we're already connected so no need to reset auth key.
      if (!this._loopStarted) {
        this._updateLoop();
        this._loopStarted = true;
      }
      return;
    }

    this.session.setAuthKey(this._sender.authKey);
    this._sender.send(this._initWith(new requests.help.GetConfig({})));

    if (!this._loopStarted) {
      this._updateLoop();
      this._loopStarted = true;
    }
    this._connectedDeferred.resolve();
    this._isSwitchingDc = false;
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
        const lastInterval = lastPongAt ? pingAt - lastPongAt : undefined;

        if (!lastInterval || lastInterval < PING_INTERVAL_TO_WAKE_UP) {
          await attempts(
            () => timeout(ping, PING_TIMEOUT),
            PING_FAIL_ATTEMPTS,
            PING_FAIL_INTERVAL
          );
        } else {
          let wakeUpWarningTimeout = setTimeout(() => {
            this._handleUpdate(
              new UpdateConnectionState(UpdateConnectionState.disconnected)
            );
            wakeUpWarningTimeout = undefined;
          }, PING_WAKE_UP_WARNING_TIMEOUT);

          await timeout(ping, PING_WAKE_UP_TIMEOUT);

          if (wakeUpWarningTimeout) {
            clearTimeout(wakeUpWarningTimeout);
            wakeUpWarningTimeout = undefined;
          }

          this._handleUpdate(
            new UpdateConnectionState(UpdateConnectionState.connected)
          );
        }

        lastPongAt = Date.now();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);

        lastPongAt = undefined;

        if (this._sender.isReconnecting || this._isSwitchingDc) {
          continue;
        }
        this._sender.reconnect();
      }

      if (Date.now() - this._lastRequest > 30 * 60 * 1000) {
        try {
          await this.pingCallback();
        } catch {}

        lastPongAt = undefined;
      }
    }
  }

  getSender() {
    return Promise.resolve(this._sender);
  }

  async invoke(request) {
    const randomDelay = Math.floor(Math.random() * 500) + 2000;
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
            this._log.info(`Sleeping for ${e.seconds}s on flood wait`);
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

  async start() {
    if (!this.isConnected()) {
      await this.connect();
    }
    const isAuth = await this.invoke(new Api.updates.GetState());

    if (!isAuth) {
      throw new Error("Not auth");
    }
  }

  addEventHandler(callback, event) {
    this._eventBuilders.push([event, callback]);
  }

  _handleUpdate(update) {
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
