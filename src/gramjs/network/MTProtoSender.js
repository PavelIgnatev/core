const MTProtoState = require('./MTProtoState');
const Helpers = require('../Helpers');
const AuthKey = require('../crypto/AuthKey');
const RPCResult = require('../tl/core/RPCResult');
const MessageContainer = require('../tl/core/MessageContainer');
const GZIPPacked = require('../tl/core/GZIPPacked');
const RequestState = require('./RequestState');

const MTProtoPlainSender = require('./MTProtoPlainSender');
const { MsgsAck, upload, MsgsStateInfo, Pong } = require('../tl').constructors;
const MessagePacker = require('../extensions/MessagePacker');
const BinaryReader = require('../extensions/BinaryReader');
const PendingState = require('../extensions/PendingState');
const { UpdateConnectionState, UpdateServerTimeOffset } = require('./updates');
const { BadMessageError } = require('../errors/Common');
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
} = require('../tl').constructors;
const { SecurityError } = require('../errors/Common');
const { RPCMessageToError } = require('../errors');
const { TypeNotFoundError } = require('../errors/Common');
const { doAuthentication } = require('./Authenticator');

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
    retries: Infinity,
    delay: 0,
    authKeyCallback: undefined,
    updateCallback: undefined,
  };

  /**
   * @param authKey
   * @param opts
   */
  constructor(authKey, opts) {
    const args = { ...MTProtoSender.DEFAULT_OPTIONS, ...opts };
    this._connection = undefined;
    this.log = null;
    this._dcId = args.dcId;
    this._retries = args.retries;
    this._delay = args.delay;
    this._updateCallback = args.updateCallback;
    this._accountId = args.accountId;
    this._prefix = args.prefix;
    this._onError = args.onError;
    this._connectCounts = 0;
    this._reconnectCounts = 0;
    this._disconnectCounts = 0;
    this._connectErrorCounts = [];
    this._authKeyCallback = args.authKeyCallback;
    this._working = args.working;

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
    this._recv_loop_handle = undefined;

    /**
     * Preserving the references of the AuthKey and state is important
     */
    this.authKey = authKey || new AuthKey();
    this._state = new MTProtoState(this.authKey);

    /**
     * Outgoing messages are put in a queue and sent in a batch.
     * Note that here we're also storing their ``_RequestState``.
     */
    this._send_queue = new MessagePacker(this._state, this._accountId);

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
      [BadServerSalt.CONSTRUCTOR_ID]: this._handleBadServerSalt.bind(this),
      [BadMsgNotification.CONSTRUCTOR_ID]:
        this._handleBadNotification.bind(this),
      [MsgDetailedInfo.CONSTRUCTOR_ID]: this._handleDetailedInfo.bind(this),
      [MsgNewDetailedInfo.CONSTRUCTOR_ID]:
        this._handleNewDetailedInfo.bind(this),
      [NewSessionCreated.CONSTRUCTOR_ID]:
        this._handleNewSessionCreated.bind(this),
      [MsgsAck.CONSTRUCTOR_ID]: this._handleAck.bind(this),
      [FutureSalts.CONSTRUCTOR_ID]: this._handleFutureSalts.bind(this),
      [MsgsStateReq.CONSTRUCTOR_ID]: this._handleStateForgotten.bind(this),
      [MsgResendReq.CONSTRUCTOR_ID]: this._handleStateForgotten.bind(this),
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
   * @returns {Promise<boolean>}
   */
  async connect(connection, force) {
    this._connectCounts += 1;
    this.userDisconnected = false;
    if (this._user_connected && !force) {
      return false;
    }
    this.isConnecting = true;
    this._connection = connection;

    for (let attempt = 0; attempt < attempt + 1; attempt++) {
      try {
        await this._connect(this.getConnection());

        this._updateCallback?.(
          new UpdateConnectionState(UpdateConnectionState.connected)
        );

        break;
      } catch (err) {
        this._connectErrorCounts.push(new Date().toISOString());

        if (attempt === 0) {
          this._updateCallback?.(
            new UpdateConnectionState(UpdateConnectionState.disconnected)
          );
        }

        console.warn({
          accountId: this._accountId,
          prefix: this._prefix,
          message: `${err.message} [${attempt + 1} attempt(s)]`,
        });
      }
    }
    this.isConnecting = false;

    return true;
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
     */
  send(request) {
    const state = new RequestState(request);
    this._send_queue.append(state);
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
      await connection.connect();
    }

    if (!this.authKey.getKey() && !this._working) {
      const plain = new MTProtoPlainSender(connection);
      const res = await doAuthentication(plain);
      await this.authKey.setKey(res.authKey.getKey());

      this._state.timeOffset = res.timeOffset;

      this._updateCallback?.(
        new UpdateServerTimeOffset(this._state.timeOffset)
      );

      if (this._authKeyCallback) {
        await this._authKeyCallback(this.authKey, this._dcId);
      }
    } else {
      this._authenticated = true;
    }
    this._user_connected = true;
    this.isReconnecting = false;

    if (!this._send_loop_handle) {
      this._send_loop_handle = this._sendLoop();
    }

    if (!this._recv_loop_handle) {
      this._recv_loop_handle = this._recvLoop();
    }

    console.warn({
      accountId: this._accountId,
      prefix: this._prefix,
      message: 'Connection to %s complete!'.replace(
        '%s',
        connection.toString()
      ),
    });
  }

  async _disconnect(connection) {
    this._disconnectCounts += 1;
    this._updateCallback?.(
      new UpdateConnectionState(UpdateConnectionState.disconnected)
    );

    if (connection === undefined) {
      return;
    }

    console.warn({
      accountId: this._accountId,
      prefix: this._prefix,
      message: 'Disconnecting from %s...'.replace('%s', connection.toString()),
    });
    this._user_connected = false;
    await connection.disconnect();
  }

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

      for (const state of batch) {
        if (!Array.isArray(state)) {
          if (
            state.request.classType === 'request' &&
            state.request.className !== 'HttpWait'
          ) {
            this._pending_state.set(state.msgId, state);
          }
        } else {
          for (const s of state) {
            if (
              s.request.classType === 'request' &&
              s.request.className !== 'HttpWait'
            ) {
              this._pending_state.set(s.msgId, s);
            }
          }
        }
      }

      if (this.isReconnecting) {
        this._send_loop_handle = undefined;
        return;
      }

      data = await this._state.encryptMessageData(data);

      try {
        await this.getConnection().send(data);
      } catch (e) {
        this._send_loop_handle = undefined;
        if (!this.userDisconnected) {
          await this.reconnect();
        }
        return;
      } finally {
        for (const state of batch) {
          if (!Array.isArray(state)) {
            if (state.request.className === 'HttpWait') {
              state.resolve();
            }
          } else {
            for (const s of state) {
              if (s.request.className === 'HttpWait') {
                state.resolve();
              }
            }
          }
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
          await this.reconnect();
        }
        this._recv_loop_handle = undefined;
        return;
      }

      try {
        message = await this._state.decryptMessageData(body);
      } catch (e) {
        if (e instanceof TypeNotFoundError) {
          continue;
        } else if (e instanceof SecurityError) {
          continue;
        } else {
          if (message) {
            this._onError(`💀 DECRYPT_MESSAGE_ERROR 💀
ID: ${this._accountId}
MESSAGE: ${JSON.stringify(message)}`);
          }
        }
      }
      try {
        await this._processMessage(message);
      } catch {}
    }

    this._recv_loop_handle = undefined;
  }

  async reconnect() {
    if (this._user_connected && !this.isReconnecting) {
      this.isReconnecting = true;

      await Helpers.sleep(1000);
      await this._reconnect();
    }
  }

  async _reconnect() {
    this._reconnectCounts += 1;
    try {
      await this._disconnect(this.getConnection());
    } catch {}

    this._send_queue.append(undefined);
    this._state.reset();

    const newConnection = new this._connection.constructor(
      this._connection._ip,
      this._connection._port,
      this._connection._dcId,
      this._accountId,
      this._onError
    );

    await this.connect(newConnection, true);

    this.isReconnecting = false;
    this._send_queue.prepend(this._pending_state.values());
    this._pending_state.clear();
  }

  async _processMessage(message) {
    if (message.obj.className === 'MsgsAck') return;

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

  _handleRPCResult(message) {
    const result = message.obj;
    const state = this._pending_state.getAndDelete(result.reqMsgId);

    if (!state) {
      try {
        const reader = new BinaryReader(result.body);
        if (!(reader.tgReadObject() instanceof upload.File)) {
          throw new TypeNotFoundError('Not an upload.File');
        }
      } catch (e) {
        if (e instanceof TypeNotFoundError) {
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
  async _handleContainer(message) {
    for (const innerMessage of message.obj.messages) {
      await this._processMessage(innerMessage);
    }
  }
  async _handleGzipPacked(message) {
    const reader = new BinaryReader(message.obj.data);
    message.obj = reader.tgReadObject();
    await this._processMessage(message);
  }
  _handleUpdate(message) {
    if (message.obj.SUBCLASS_OF_ID !== 0x8af52aac) {
      return;
    }

    this._updateCallback?.(message.obj);
  }
  _handlePong(message) {
    const pong = message.obj;

    const newTimeOffset = this._state.updateTimeOffset(message.msgId);
    this._updateCallback?.(new UpdateServerTimeOffset(newTimeOffset));

    const state = this._pending_state.getAndDelete(pong.msgId);

    if (state) {
      state.resolve(pong);
    }
  }
  _handleBadServerSalt(message) {
    const badSalt = message.obj;

    this._state.salt = badSalt.newServerSalt;
    const states = this._popStates(badSalt.badMsgId);
    this._send_queue.extend(states);
  }
  _handleBadNotification(message) {
    const badMsg = message.obj;
    const states = this._popStates(badMsg.badMsgId);

    if ([16, 17].includes(badMsg.errorCode)) {
      // Sent msg_id too low or too high (respectively).
      // Use the current msg_id to determine the right time offset.
      const newTimeOffset = this._state.updateTimeOffset(message.msgId);

      this._updateCallback?.(new UpdateServerTimeOffset(newTimeOffset));
    } else if (badMsg.errorCode === 32) {
      // msg_seqno too low, so just pump it up by some "large" amount
      // TODO A better fix would be to start with a new fresh session ID
      this._state._sequence += 64;
    } else if (badMsg.errorCode === 33) {
      // msg_seqno too high never seems to happen but just in case
      this._state._sequence -= 16;
    } else {
      for (const state of states) {
        state.reject(new BadMessageError(state.request, badMsg.errorCode));
      }

      return;
    }
    // Messages are to be re-sent once we've corrected the issue
    this._send_queue.extend(states);
  }
  _handleDetailedInfo() {}
  _handleNewDetailedInfo() {}
  _handleNewSessionCreated(message) {
    this._state.salt = message.obj.serverSalt;
  }
  _handleAck() {}
  _handleFutureSalts(message) {
    const state = this._pending_state.getAndDelete(message.msgId);

    if (state) {
      state.resolve(message.obj);
    }
  }
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
  _handleMsgAll() {}
}

module.exports = MTProtoSender;
