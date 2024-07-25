const { red, blue } = require("colors/safe");

const { RPCError } = require("../errors");

const MtProtoPlainSender = require("./MTProtoPlainSender");
const MTProtoState = require("./MTProtoState");
const Helpers = require("../Helpers");
const AuthKey = require("../crypto/AuthKey");
const { doAuthentication } = require("./Authenticator");
const RPCResult = require("../tl/core/RPCResult");
const MessageContainer = require("../tl/core/MessageContainer");
const GZIPPacked = require("../tl/core/GZIPPacked");
const RequestState = require("./RequestState");

const { MsgsAck, upload, MsgsStateInfo, Pong } = require("../tl").constructors;
const MessagePacker = require("../extensions/MessagePacker");
const BinaryReader = require("../extensions/BinaryReader");
const PendingState = require("../extensions/PendingState");
const { UpdateConnectionState, UpdateServerTimeOffset } = require("./updates");
const { BadMessageError } = require("../errors/Common");
const {
    BadServerSalt,
    BadMsgNotification,
    MsgDetailedInfo,
    MsgNewDetailedInfo,
    NewSessionCreated,
    FutureSalts,
    MsgsStateReq,
    MsgResendReq,
    MsgsAllInfo,
    HttpWait,
} = require("../tl").constructors;
const { SecurityError } = require("../errors/Common");
const { InvalidBufferError } = require("../errors/Common");
const { RPCMessageToError } = require("../errors");
const { TypeNotFoundError } = require("../errors/Common");

const LONGPOLL_MAX_WAIT = 3000;
const LONGPOLL_MAX_DELAY = 500;
const LONGPOLL_WAIT_AFTER = 150;

/**
 * MTProto Mobile Protocol sender
 * (https://core.telegram.org/mtproto/description)
 * This class is responsible for wrapping requests into `TLMessage`'s,
 * sending them over the network and receiving them in a safe manner.
 *
 * Automatic reconnection due to temporary network issues is a concern
 * for this class as well, including retry of messages that could not
 * be sent successfully.
 *
 * A new authorization key will be generated on connection if no other
 * key exists yet.
 */
class MTProtoSender {
    static DEFAULT_OPTIONS = {
        logger: null,
        retries: Infinity,
        retriesToFallback: 1000000000000,
        delay: 2000,
        retryMainConnectionDelay: 10000,
        shouldForceHttpTransport: false,
        shouldAllowHttpTransport: false,
        autoReconnect: true,
        connectTimeout: undefined,
        authKeyCallback: undefined,
        updateCallback: undefined,
        autoReconnectCallback: undefined,
        isMainSender: undefined,
        onConnectionBreak: undefined,
        isExported: undefined,
        getShouldDebugExportedSenders: undefined,
    };

    /**
     * @param authKey
     * @param opts
     */
    constructor(authKey, opts) {
        const args = { ...MTProtoSender.DEFAULT_OPTIONS, ...opts };
        this._connection = undefined;
        this._fallbackConnection = undefined;
        this._shouldForceHttpTransport = args.shouldForceHttpTransport;
        this._shouldAllowHttpTransport = args.shouldAllowHttpTransport;
        this.log = null;
        this._dcId = args.dcId;
        this._senderIndex = args.senderIndex;
        this._retries = args.retries;
        this._retriesToFallback = args.retriesToFallback;
        this._delay = args.delay;
        this._retryMainConnectionDelay = args.retryMainConnectionDelay;
        this._autoReconnect = args.autoReconnect;
        this._connectTimeout = args.connectTimeout;
        this._authKeyCallback = args.authKeyCallback;
        this._updateCallback = args.updateCallback;
        this._autoReconnectCallback = args.autoReconnectCallback;
        this._isMainSender = args.isMainSender;
        this._isExported = args.isExported;
        this._onConnectionBreak = args.onConnectionBreak;
        this._isFallback = false;
        this._getShouldDebugExportedSenders =
            args.getShouldDebugExportedSenders;
        this._accountId = args.accountId;

        /**
         * whether we disconnected ourself or telegram did it.
         */
        this.userDisconnected = false;

        /**
         * Whether the user has explicitly connected or disconnected.
         *
         * If a disconnection happens for any other reason and it
         * was *not* user action then the pending messages won't
         * be cleared but on explicit user disconnection all the
         * pending futures should be cancelled.
         */
        this._user_connected = false;
        this.isReconnecting = false;
        this._disconnected = true;

        /**
         * We need to join the loops upon disconnection
         */
        this._send_loop_handle = undefined;
        this._long_poll_loop_handle = undefined;
        this._recv_loop_handle = undefined;

        /**
         * Preserving the references of the AuthKey and state is important
         */
        this.authKey = authKey || new AuthKey();
        this._state = new MTProtoState(this.authKey, console.log);

        /**
         * Outgoing messages are put in a queue and sent in a batch.
         * Note that here we're also storing their ``_RequestState``.
         */
        this._send_queue = new MessagePacker(
            this._state,
            console.log,
            this._accountId
        );
        this._send_queue_long_poll = new MessagePacker(
            this._state,
            console.log,
            this._accountId
        );

        /**
         * Sent states are remembered until a response is received.
         */
        this._pending_state = new PendingState();

        /**
         * Responses must be acknowledged, and we can also batch these.
         */
        this._pending_ack = new Set();

        /**
         * Similar to pending_messages but only for the last acknowledges.
         * These can't go in pending_messages because no acknowledge for them
         * is received, but we may still need to resend their state on bad salts.
         */
        this._last_acks = [];

        /**
         * Jump table from response ID to method that handles it
         */

        this._handlers = {
            [RPCResult.CONSTRUCTOR_ID]: this._handleRPCResult.bind(this),
            [MessageContainer.CONSTRUCTOR_ID]: this._handleContainer.bind(this),
            [GZIPPacked.CONSTRUCTOR_ID]: this._handleGzipPacked.bind(this),
            [Pong.CONSTRUCTOR_ID]: this._handlePong.bind(this),
            [BadServerSalt.CONSTRUCTOR_ID]:
                this._handleBadServerSalt.bind(this),
            [BadMsgNotification.CONSTRUCTOR_ID]:
                this._handleBadNotification.bind(this),
            [MsgDetailedInfo.CONSTRUCTOR_ID]:
                this._handleDetailedInfo.bind(this),
            [MsgNewDetailedInfo.CONSTRUCTOR_ID]:
                this._handleNewDetailedInfo.bind(this),
            [NewSessionCreated.CONSTRUCTOR_ID]:
                this._handleNewSessionCreated.bind(this),
            [MsgsAck.CONSTRUCTOR_ID]: this._handleAck.bind(this),
            [FutureSalts.CONSTRUCTOR_ID]: this._handleFutureSalts.bind(this),
            [MsgsStateReq.CONSTRUCTOR_ID]:
                this._handleStateForgotten.bind(this),
            [MsgResendReq.CONSTRUCTOR_ID]:
                this._handleStateForgotten.bind(this),
            [MsgsAllInfo.CONSTRUCTOR_ID]: this._handleMsgAll.bind(this),
        };
    }

    getConnection() {
        return this._connection;
    }

    /**
     * Connects to the specified given connection using the given auth key.
     * @param connection
     * @param [force]
     * @param fallbackConnection
     * @returns {Promise<boolean>}
     */
    async connect(connection, force, fallbackConnection) {
        this.userDisconnected = false;

        if (this._user_connected && !force) {
            console.log(`[${this._accountId}] User is already connected!`);
            return false;
        }
        this.isConnecting = true;
        this._isFallback = false;
        this._connection = connection;
        this._fallbackConnection = fallbackConnection;

        for (
            let attempt = 0;
            attempt < this._retries + this._retriesToFallback;
            attempt++
        ) {
            try {
                console.log(`[${this._accountId}] Connecting...`);
                await this._connect(this.getConnection());
                console.log(`[${this._accountId}] Connected!`);
                if (!this._isExported) {
                    this._updateCallback?.(
                        new UpdateConnectionState(
                            UpdateConnectionState.connected
                        )
                    );
                }
                break;
            } catch (err) {
                if (!this._isExported && attempt === 0) {
                    this._updateCallback?.(
                        new UpdateConnectionState(
                            UpdateConnectionState.disconnected
                        )
                    );
                }
                console.log(
                    red(
                        `[${this._accountId}] WebSocket error: ${
                            err.message
                        } [${attempt + 1} attempt(s)   ]`
                    )
                );
                // eslint-disable-next-line no-console

                await Helpers.sleep(this._delay);
            }
        }
        this.isConnecting = false;

        return true;
    }

    async tryReconnectToMain() {
        await Helpers.sleep(2000);
    }

    isConnected() {
        return this._user_connected;
    }

    /**
     * Cleanly disconnects the instance from the network, cancels
     * all pending requests, and closes the send and receive loops.
     */
    async disconnect() {
        this.userDisconnected = true;
        console.log(red(`[${this._accountId}] Disconnecting...`));
        await this._disconnect(this.getConnection());
    }

    destroy() {
        this._send_queue.clear();
    }

    /**
     *
     This method enqueues the given request to be sent. Its send
     state will be saved until a response arrives, and a ``Future``
     that will be resolved when the response arrives will be returned:

     .. code-block:: javascript

     async def method():
     # Sending (enqueued for the send loop)
     future = sender.send(request)
     # Receiving (waits for the receive loop to read the result)
     result = await future

     Designed like this because Telegram may send the response at
     any point, and it can send other items while one waits for it.
     Once the response for this future arrives, it is set with the
     received result, quite similar to how a ``receive()`` call
     would otherwise work.

     Since the receiving part is "built in" the future, it's
     impossible to await receive a result that was never sent.
     * @param request
     * @param abortSignal
     * @param isLongPoll
     * @returns {RequestState}
     */
    send(request, abortSignal, isLongPoll = false) {
        const state = new RequestState(request, abortSignal);
        if (!isLongPoll) {
            this._send_queue.append(state);
        } else {
            this._send_queue_long_poll.append(state);
        }
        return state.promise;
    }

    addStateToQueue(state) {
        this._send_queue.append(state);
    }

    /**
     * Performs the actual connection, retrying, generating the
     * authorization key if necessary, and starting the send and
     * receive loops.
     * @returns {Promise<void>}
     * @private
     */
    async _connect(connection) {
        if (!connection.isConnected()) {
            console.log(
                `[${this._accountId}] Connecting to {0}...`.replace(
                    "{0}",
                    connection
                )
            );
            await connection.connect();
            console.log(`[${this._accountId}] Connection success!`);
        }

        if (!this.authKey.getKey()) {
            const plain = new MtProtoPlainSender(connection, console.log);
            console.log(red(`[${this._accountId}] New auth_key attempt ...`));
            const res = await doAuthentication(plain, console.log);
            console.log(
                red(`[${this._accountId}] Generated new auth_key successfully`)
            );
            await this.authKey.setKey(res.authKey);

            this._state.timeOffset = res.timeOffset;

            if (!this._isExported) {
                this._updateCallback?.(
                    new UpdateServerTimeOffset(this._state.timeOffset)
                );
            }

            /**
             * This is *EXTREMELY* important since we don't control
             * external references to the authorization key, we must
             * notify whenever we change it. This is crucial when we
             * switch to different data centers.
             */
            if (this._authKeyCallback) {
                await this._authKeyCallback(this.authKey, this._dcId);
            }
        } else {
            this._authenticated = true;
            console.log(`[${this._accountId}] Already have an auth key ...`);
        }
        this._user_connected = true;
        this.isReconnecting = false;

        if (!this._send_loop_handle) {
            console.log(`[${this._accountId}] Starting send loop`);
            this._send_loop_handle = this._sendLoop();
        }

        if (!this._recv_loop_handle) {
            console.log(`[${this._accountId}] Starting receive loop`);
            this._recv_loop_handle = this._recvLoop();
        }

        if (!this._long_poll_loop_handle && connection.shouldLongPoll) {
            console.log(`[${this._accountId}] Starting long-poll loop`);
            this._long_poll_loop_handle = this._longPollLoop();
        }

        // _disconnected only completes after manual disconnection
        // or errors after which the sender cannot continue such
        // as failing to reconnect or any unexpected error.

        console.log(
            `[${this._accountId}] Connection to %s complete!`.replace(
                "%s",
                connection.toString()
            )
        );
    }

    async _disconnect(connection) {
        if (!this._isExported) {
            this._updateCallback?.(
                new UpdateConnectionState(UpdateConnectionState.disconnected)
            );
        }

        if (connection === undefined) {
            console.log(
                red(
                    `[${this._accountId}] Not disconnecting (already have no connection)`
                )
            );
            return;
        }

        console.log(
            red(
                `[${this._accountId}] Disconnecting from %s...`.replace(
                    "%s",
                    connection.toString()
                )
            )
        );
        this._user_connected = false;
        console.log(red(`[${this._accountId}] Closing current connection...`));
        console.log(red(`[${this._accountId}] Disconnecting`));
        await connection.disconnect();
    }

    async _longPollLoop() {
        return;
    }

    /**
     * This loop is responsible for popping items off the send
     * queue, encrypting them, and sending them over the network.
     * Besides `connect`, only this method ever sends data.
     * @returns {Promise<void>}
     * @private
     */
    async _sendLoop() {
        // Retry previous pending requests
        this._send_queue.prepend(this._pending_state.values());
        this._pending_state.clear();

        while (this._user_connected && !this.isReconnecting) {
            await this._send_queue.wait();

            const res = await this._send_queue.get();
            if (!res) {
                continue;
            }

            let { data } = res;
            const { batch } = res;
            const allClassNames = batch.map((m) => m.request.className);
            const onlyUpdateStatus =
                allClassNames.length === 1 &&
                allClassNames[0] === "account.UpdateStatus";

            if (!onlyUpdateStatus) {
                console.log(
                    `[${this._accountId}] Init sending...`,
                    allClassNames,
                    "message(s) to send"
                );
            }

            for (const state of batch) {
                if (!Array.isArray(state)) {
                    if (
                        state.request.classType === "request" &&
                        state.request.className !== "HttpWait"
                    ) {
                        this._pending_state.set(state.msgId, state);
                    }
                } else {
                    for (const s of state) {
                        if (
                            s.request.classType === "request" &&
                            s.request.className !== "HttpWait"
                        ) {
                            this._pending_state.set(s.msgId, s);
                        }
                    }
                }
            }

            if (this.isReconnecting) {
                console.log(
                    `[${this._accountId}] Reconnecting before sending... :(`
                );
                this._send_loop_handle = undefined;
                return;
            }
            const classNames = batch.map((m) => m.request.className);
            const randomDelay =
                classNames.includes("account.GetAuthorizations") ||
                classNames.includes("account.UpdateStatus") ||
                classNames.includes("InvokeWithLayer")
                    ? 0
                    : Math.floor(Math.random() * 10000) + 2000;

            if (!onlyUpdateStatus) {
                console.log(
                    `[${this._accountId}] Encrypting (${randomDelay}ms)...`,
                    allClassNames,
                    `message(s) in ${blue(data.length)} bytes for sending`
                );
            }

            await new Promise((r) => setTimeout(r, randomDelay));
            data = await this._state.encryptMessageData(data);

            try {
                await this.getConnection().send(data);
            } catch (e) {
                console.log(
                    red(`[${this._accountId}] Send loop error: ${e.message}`)
                );
                this._send_loop_handle = undefined;
                if (!this.userDisconnected) {
                    this.reconnect();
                }
                return;
            } finally {
                for (const state of batch) {
                    if (!Array.isArray(state)) {
                        if (state.request.className === "HttpWait") {
                            state.resolve();
                        }
                    } else {
                        for (const s of state) {
                            if (s.request.className === "HttpWait") {
                                state.resolve();
                            }
                        }
                    }
                }

                if (!onlyUpdateStatus) {
                    console.log(
                        `[${this._accountId}]`,
                        "Done sending...",
                        allClassNames
                    );
                }
            }
        }

        this._send_loop_handle = undefined;
    }

    async _recvLoop() {
        let body;
        let message;

        while (this._user_connected && !this.isReconnecting) {
            try {
                body = await this.getConnection().recv();
            } catch (e) {
                /** when the server disconnects us we want to reconnect */
                if (!this.userDisconnected) {
                    console.log(
                        red(
                            `[${this._accountId}] Recv loop error: ${e.message}`
                        )
                    );
                    this.reconnect();
                }
                this._recv_loop_handle = undefined;
                return;
            }

            try {
                message = await this._state.decryptMessageData(body);
            } catch (e) {
                console.log(
                    red(
                        `[${this._accountId}] Error while receiving items from the network ${e.message}`
                    )
                );
                if (e instanceof TypeNotFoundError) {
                    // Received object which we don't know how to deserialize
                    console.log(
                        red(
                            `[${this._accountId}] Type ${e.invalidConstructorId} not found, remaining data ${e.remaining}`
                        )
                    );
                    continue;
                } else if (e instanceof SecurityError) {
                    // A step while decoding had the incorrect data. This message
                    // should not be considered safe and it should be ignored.
                    console.log(
                        red(
                            `[${this._accountId}] Security error while unpacking a received message: ${e.message}`
                        )
                    );
                    continue;
                } else if (e instanceof InvalidBufferError) {
                    // 404 means that the server has "forgotten" our auth key and we need to create a new one.
                    if (e.code === 404) {
                        this._handleBadAuthKey();
                    } else {
                        // this happens sometimes when telegram is having some internal issues.
                        // reconnecting should be enough usually
                        // since the data we sent and received is probably wrong now.
                        console.log(
                            red(
                                `[${this._accountId}] Invalid buffer ${e.code} for dc ${this._dcId}`
                            )
                        );
                        this.reconnect();
                    }
                    this._recv_loop_handle = undefined;
                    return;
                } else {
                    console.log(
                        red(
                            `[${this._accountId}] Recv loop error unhandled: ${e.message}`
                        )
                    );
                    this.reconnect();
                    this._recv_loop_handle = undefined;
                    return;
                }
            }
            try {
                await this._processMessage(message);
            } catch (e) {
                // `RPCError` errors except for 'AUTH_KEY_UNREGISTERED' should be handled by the client
                if (e instanceof RPCError) {
                    if (
                        e.message === "AUTH_KEY_UNREGISTERED" ||
                        e.message === "SESSION_REVOKED"
                    ) {
                        // 'AUTH_KEY_UNREGISTERED' for the main sender is thrown when unauthorized and should be ignored
                        this._handleBadAuthKey(true);
                    }
                } else {
                    console.log(
                        red(
                            `[${this._accountId}] Unhandled error: ${e.message}`
                        )
                    );
                }
            }

            void this.checkLongPoll();
        }

        this._recv_loop_handle = undefined;
    }

    checkLongPoll() {
        return;
    }

    _handleBadAuthKey(shouldSkipForMain) {
        if (shouldSkipForMain && this._isMainSender) {
            return;
        }

        console.log(
            red(
                `[${this._accountId}] Broken authorization key for dc ${this._dcId}, resetting...`
            )
        );

        if (this._isMainSender && !this._isExported) {
            this._updateCallback?.(
                new UpdateConnectionState(UpdateConnectionState.broken)
            );
        } else if (!this._isMainSender && this._onConnectionBreak) {
            this._onConnectionBreak(this._dcId);
        }
    }

    // Response Handlers

    /**
     * Adds the given message to the list of messages that must be
     * acknowledged and dispatches control to different ``_handle_*``
     * method based on its type.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _processMessage(message) {
        if (message.obj.className === "MsgsAck") return;

        if (this.getConnection().shouldLongPoll) {
            this._send_queue.setReady(true);
        }
        // eslint-disable-next-line require-atomic-updates
        message.obj = await message.obj;
        let handler = this._handlers[message.obj.CONSTRUCTOR_ID];
        if (!handler) {
            handler = this._handleUpdate.bind(this);
        }

        await handler(message);
    }

    /**
     * Pops the states known to match the given ID from pending messages.
     * This method should be used when the response isn't specific.
     * @param msgId
     * @returns {*[]}
     * @private
     */
    _popStates(msgId) {
        const state = this._pending_state.getAndDelete(msgId);
        if (state) {
            return [state];
        }

        const toPop = [];

        for (const pendingState of this._pending_state.values()) {
            if (pendingState.containerId?.equals(msgId)) {
                toPop.push(pendingState.msgId);
            }
        }

        if (toPop.length) {
            const temp = [];
            for (const x of toPop) {
                temp.push(this._pending_state.getAndDelete(x));
            }
            return temp;
        }

        for (const ack of this._last_acks) {
            if (ack.msgId === msgId) {
                return [ack];
            }
        }

        return [];
    }

    /**
     * Handles the result for Remote Procedure Calls:
     * rpc_result#f35c6d01 req_msg_id:long result:bytes = RpcResult;
     * This is where the future results for sent requests are set.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleRPCResult(message) {
        const result = message.obj;
        const state = this._pending_state.getAndDelete(result.reqMsgId);

        if (!state) {
            // TODO We should not get responses to things we never sent
            // However receiving a File() with empty bytes is "common".
            // See #658, #759 and #958. They seem to happen in a container
            // which contain the real response right after.
            try {
                const reader = new BinaryReader(result.body);
                if (!(reader.tgReadObject() instanceof upload.File)) {
                    throw new TypeNotFoundError("Not an upload.File");
                }
            } catch (e) {
                if (e instanceof TypeNotFoundError) {
                    console.log(
                        red(
                            `[${this._accountId}] Received response without parent request: ${result.body}`
                        )
                    );
                    return;
                }

                throw e;
            }
            return;
        }

        if (result.error) {
            // eslint-disable-next-line new-cap
            const error = RPCMessageToError(result.error, state.request);
            state.reject(error);
            throw error;
        } else {
            try {
                const reader = new BinaryReader(result.body);
                const read = state.request.readResult(reader);
                state.resolve(read);
            } catch (err) {
                state.reject(err);
                throw err;
            }
        }
    }

    /**
     * Processes the inner messages of a container with many of them:
     * msg_container#73f1f8dc messages:vector<%Message> = MessageContainer;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleContainer(message) {
        for (const innerMessage of message.obj.messages) {
            await this._processMessage(innerMessage);
        }
    }

    /**
     * Unpacks the data from a gzipped object and processes it:
     * gzip_packed#3072cfa1 packed_data:bytes = Object;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    async _handleGzipPacked(message) {
        const reader = new BinaryReader(message.obj.data);
        message.obj = reader.tgReadObject();
        await this._processMessage(message);
    }

    _handleUpdate(message) {
        if (message.obj.SUBCLASS_OF_ID !== 0x8af52aac) {
            console.log(
                red(
                    `[${this._accountId}] Note: ${message.obj.className} is not an update, not dispatching it`
                )
            );
            return;
        }

        if (!this._isExported) {
            this._updateCallback?.(message.obj);
        }
    }

    /**
     * Handles pong results, which don't come inside a ``RPCResult``
     * but are still sent through a request:
     * pong#347773c5 msg_id:long ping_id:long = Pong;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handlePong(message) {
        const pong = message.obj;

        const newTimeOffset = this._state.updateTimeOffset(message.msgId);
        if (!this._isExported) {
            this._updateCallback?.(new UpdateServerTimeOffset(newTimeOffset));
        }

        const state = this._pending_state.getAndDelete(pong.msgId);

        if (state) {
            state.resolve(pong);
        }
    }

    /**
     * Corrects the currently used server salt to use the right value
     * before enqueuing the rejected message to be re-sent:
     * bad_server_salt#edab447b bad_msg_id:long bad_msg_seqno:int
     * error_code:int new_server_salt:long = BadMsgNotification;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleBadServerSalt(message) {
        const badSalt = message.obj;

        this._state.salt = badSalt.newServerSalt;
        const states = this._popStates(badSalt.badMsgId);
        this._send_queue.extend(states);
        console.log(
            `[${this._accountId}] Resent state...`,
            states.map((state) => state.request.className),
            "reason - bad salt"
        );
    }

    /**
     * Adjusts the current state to be correct based on the
     * received bad message notification whenever possible:
     * bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int
     * error_code:int = BadMsgNotification;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleBadNotification(message) {
        const badMsg = message.obj;
        const states = this._popStates(badMsg.badMsgId);
        console.log(
            red(
                `[${this._accountId}] Handling bad msg ${JSON.stringify(
                    badMsg
                )}`
            )
        );
        if ([16, 17].includes(badMsg.errorCode)) {
            // Sent msg_id too low or too high (respectively).
            // Use the current msg_id to determine the right time offset.
            const newTimeOffset = this._state.updateTimeOffset(message.msgId);

            if (!this._isExported) {
                this._updateCallback?.(
                    new UpdateServerTimeOffset(newTimeOffset)
                );
            }

            console.log(
                red(
                    `[${this._accountId}] System clock is wrong, set time offset to ${newTimeOffset}s`
                )
            );
        } else if (badMsg.errorCode === 32) {
            // msg_seqno too low, so just pump it up by some "large" amount
            // TODO A better fix would be to start with a new fresh session ID
            this._state._sequence += 64;
        } else if (badMsg.errorCode === 33) {
            // msg_seqno too high never seems to happen but just in case
            this._state._sequence -= 16;
        } else {
            for (const state of states) {
                state.reject(
                    new BadMessageError(state.request, badMsg.errorCode)
                );
            }

            return;
        }
        // Messages are to be re-sent once we've corrected the issue
        this._send_queue.extend(states);
        console.log(
            red(
                `[${this._accountId}] Resent state...`,
                states.map((state) => state.request.className),
                "reason - bad msg"
            )
        );
    }

    /**
     * Updates the current status with the received detailed information:
     * msg_detailed_info#276d3ec6 msg_id:long answer_msg_id:long
     * bytes:int status:int = MsgDetailedInfo;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleDetailedInfo(message) {
        // TODO https://goo.gl/VvpCC6
        const msgId = message.obj.answerMsgId;
        console.log(
            red(
                `[${this._accountId}] Handling detailed info for message ${msgId}`
            )
        );
    }

    /**
     * Updates the current status with the received detailed information:
     * msg_new_detailed_info#809db6df answer_msg_id:long
     * bytes:int status:int = MsgDetailedInfo;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleNewDetailedInfo(message) {
        // TODO https://goo.gl/VvpCC6
        const msgId = message.obj.answerMsgId;
        console.log(
            red(
                `[${this._accountId}] Handling new detailed info for message ${msgId}`
            )
        );
    }

    /**
     * Updates the current status with the received session information:
     * new_session_created#9ec20908 first_msg_id:long unique_id:long
     * server_salt:long = NewSession;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleNewSessionCreated(message) {
        // TODO https://goo.gl/LMyN7A
        this._state.salt = message.obj.serverSalt;
    }

    /**
     * Handles a server acknowledge about our messages. Normally these can be ignored
     */
    _handleAck() {}

    /**
     * Handles future salt results, which don't come inside a
     * ``rpc_result`` but are still sent through a request:
     *     future_salts#ae500895 req_msg_id:long now:int
     *     salts:vector<future_salt> = FutureSalts;
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleFutureSalts(message) {
        // TODO save these salts and automatically adjust to the
        // correct one whenever the salt in use expires.
        console.log(
            red(
                `[${this._accountId}] Handling future salts for message ${message.msgId}`
            )
        );
        const state = this._pending_state.getAndDelete(message.msgId);

        if (state) {
            state.resolve(message.obj);
        }
    }

    /**
     * Handles both :tl:`MsgsStateReq` and :tl:`MsgResendReq` by
     * enqueuing a :tl:`MsgsStateInfo` to be sent at a later point.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    _handleStateForgotten(message) {
        this._send_queue.append(
            new RequestState(
                new MsgsStateInfo({
                    msgId: message.msgId,
                    query: String.fromCharCode(1).repeat(message.obj.msgIds),
                })
            )
        );
    }

    /**
     * Handles :tl:`MsgsAllInfo` by doing nothing (yet).
     * used as part of the telegram protocol https://core.telegram.org/mtproto/service_messages_about_messages
     * This message does not require an acknowledgment.
     * @param message
     * @returns {Promise<void>}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleMsgAll(message) {}

    reconnect() {
        if (this._user_connected && !this.isReconnecting) {
            this.isReconnecting = true;
            // TODO Should we set this?
            // this._user_connected = false
            // we want to wait a second between each reconnect try to not flood the server with reconnects
            // in case of internal server issues.
            Helpers.sleep(1000).then(() => {
                console.log(red(`[${this._accountId}] Reconnecting...`));
                console.log(red(`[${this._accountId}] Started reconnecting`));
                this._reconnect();
            });
        }
    }

    async _reconnect() {
        console.log(red(`[${this._accountId}] Closing current connection...`));
        try {
            console.log(
                red(
                    `[${this._accountId}] [Reconnect] Closing current connection...`
                )
            );
            await this._disconnect(this.getConnection());
        } catch (err) {
            console.log(
                red(`[${this._accountId}] Reconnect error: ${err.message}`)
            );
        }

        this._send_queue.append(undefined);
        this._state.reset();

        const newConnection = new this._connection.constructor(
            this._connection._ip,
            this._connection._port,
            this._connection._dcId,
            this._connection._log,
            this._connection._testServers,
            false,
            this._accountId
        );
        const newFallbackConnection = new this._fallbackConnection.constructor(
            this._connection._ip,
            this._connection._port,
            this._connection._dcId,
            this._connection._log,
            this._connection._testServers,
            false,
            this._accountId
        );
        await this.connect(newConnection, true, newFallbackConnection);

        this.isReconnecting = false;
        this._send_queue.prepend(this._pending_state.values());
        this._pending_state.clear();

        if (this._autoReconnectCallback) {
            await this._autoReconnectCallback();
        }
    }
}

module.exports = MTProtoSender;
