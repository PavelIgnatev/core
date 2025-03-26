const { sleep } = require('../Helpers');
const errors = require('../errors');

const { LAYER } = require('../tl/AllTLObjects');
const { constructors, requests } = require('../tl');
const { ConnectionTCPObfuscated, MTProtoSender } = require('../network');
const { uploadFile } = require('./uploadFile');
const RequestState = require('../network/RequestState');
const utils = require('../Utils');

class TelegramClient {
  constructor(
    session,
    apiId,
    deviceModel,
    systemVersion,
    appVersion,
    langCode,
    langPack,
    systemLangCode,
    acountId,
    prefix,
    specialdcId,
    proxy,
    onError,
    onTraffic
  ) {
    if (
      typeof acountId !== 'string' ||
      typeof onError !== 'function' ||
      typeof proxy !== 'string'
    ) {
      throw new Error('DATA_NOT_CORRECT');
    }

    this.apiId = apiId;
    this.defaultDcId = 2;
    this.specialDcId = specialdcId;
    this.session = session;
    this._accountId = acountId;
    this._proxy = proxy;
    this._prefix = prefix;
    this._eventBuilders = [];
    this._phoneCodeHash = {};
    this._requestRetries = 5;
    this._loopStarted = false;
    this._isReconnecting = false;
    this._connectionRetries = Infinity;
    this._retryDelay = 1000;
    this._connection = ConnectionTCPObfuscated;
    this._onError = onError;
    this._onTraffic = onTraffic;
    this._initTime = 0;
    this._endTime = 0;
    this._destryed = false;

    // Счетчики соединений
    this._connectCounts = 0;
    this._reconnectCounts = 0;
    this._disconnectCounts = 0;
    this._connectErrorCounts = 0;

    if (!this.session._working) {
      this._initWith = (x) => {
        return new requests.InvokeWithLayer({
          layer: LAYER,
          query: new requests.InitConnection({
            apiId: this.apiId,
            deviceModel,
            systemVersion,
            appVersion,
            langCode,
            langPack,
            systemLangCode,
            query: x,
            proxy: undefined,
          }),
        });
      };
    }
  }

  async connect() {
    this._connectCounts += 1;
    await this._initSession();

    if (this._sender === undefined) {
      this._sender = new MTProtoSender(this.session.getAuthKey(), {
        dcId: this.session.dcId,
        retries: this._connectionRetries,
        delay: this._retryDelay,
        updateCallback: this._handleUpdate.bind(this),
        authKeyCallback: this._authKeyCallback.bind(this),
        accountId: this._accountId,
        prefix: this._prefix,
        proxy: this._proxy,
        working: this.session._working,
        onError: this._onError,
        onTraffic: this._onTraffic,
        onErrorCount: () => {
          this._connectErrorCounts += 1;
        },
      });
    }

    // Установка переменных состояния
    this._sender.userDisconnected = false;
    this._sender._user_connected = false;
    this._sender.isReconnecting = false;
    this._sender._disconnected = true;

    const connection = new this._connection(
      this.session.serverAddress,
      this.session.port,
      this.session.dcId,
      this._accountId,
      this._proxy,
      this._onError,
      this._onTraffic
    );

    await this._sender.connect(connection, undefined);

    this._sender._user_connected = true;
    this._sender._disconnected = false;

    this.session.setAuthKey(this._sender.authKey);

    if (!this.session._working) {
      await this._sender.send(this._initWith(new requests.help.GetConfig({})));
    }
  }

  async reconnect() {
    if (!this._isReconnecting) {
      this._isReconnecting = true;
      this._reconnectCounts += 1;

      const MAX_ATTEMPTS = 3;

      let attemptCount = 0;
      let reconnected = false;

      const pendingTasks = this._sender
        ? [...this._sender._pending_state.values()]
        : [];

      while (attemptCount < MAX_ATTEMPTS && !reconnected) {
        attemptCount++;
        try {
          await Promise.race([
            this._reconnect(pendingTasks),
            new Promise((_, r) =>
              setTimeout(() => {
                r(new Error('RECONNECT_TIMEOUT'));
              }, 20000)
            ),
          ]);
          reconnected = true;
        } catch (error) {
          if (attemptCount >= MAX_ATTEMPTS) {
            this._onError(`** RECONNECT_FAILED **
ACCOUNT ID: ${this._accountId}
ERROR: ${error.message}`);
            break;
          }
        }
      }

      this._isReconnecting = false;
    }
  }

  async _reconnect(pendingTasks) {
    await this.disconnect();

    this._sender = undefined;

    await sleep(2000);

    await this.connect();
    this._sender._send_queue.prepend(pendingTasks);
  }

  _authKeyCallback(authKey, dcId) {
    this.session.setAuthKey(authKey, dcId);
  }

  async _initSession() {
    await this.session.load();

    if (!this.session._working && this.specialDcId) {
      const DC = utils.getDC(this.specialDcId);
      this.session.setDC(this.specialDcId, DC.ipAddress, 443);
    }
  }

  /**
   * Disconnects from the Telegram server
   * @returns {Promise<void>}
   */
  async disconnect() {
    if (this._sender) {
      this._disconnectCounts += 1;
      await this._sender.disconnect();
    }
  }

  async destroy() {
    await this.disconnect();

    if (this._sender) {
      this._sender._send_queue.clear();
      this._sender._pending_state.clear();
      this._sender._user_connected = false;
      this._sender._disconnected = true;
      this._sender.isReconnecting = false;
      this._sender.userDisconnected = true;
    }

    this._destryed = true;
  }

  getSender() {
    return Promise.resolve(this._sender);
  }

  async invoke(request) {
    if (request.classType !== 'request') {
      throw new Error('You can only invoke requests');
    }

    const es = [];
    const maxTimeout =
      request.className === 'PingDelayDisconnect' ||
      request.className === 'account.UpdateStatus'
        ? 10000
        : 150000;
    const state = new RequestState(request);

    let attempt = 0;
    for (attempt = 0; attempt < this._requestRetries; attempt++) {
      try {
        if (!this._sender) {
          es.push('MAIN_CONNECTION_NOT_INITED');
          await this.reconnect();
          await sleep(10000);
          continue;
        }

        this._sender.addStateToQueue(state);

        const result = await Promise.race([
          state.promise,
          new Promise((_, r) =>
            setTimeout(() => {
              r(new Error('TIMEOUT_ERROR'));
            }, maxTimeout)
          ),
        ]);

        state.finished.resolve();
        return result;
      } catch (e) {
        es.push(e.message);
        if (
          e instanceof errors.ServerError ||
          e.message === 'RPC_CALL_FAIL' ||
          e.message === 'RPC_MCGET_FAIL'
        ) {
          this._connectErrorCounts += 1;
        } else if (
          e instanceof errors.FloodWaitError ||
          e instanceof errors.FloodTestPhoneWaitError
        ) {
          if (e.seconds <= 60) {
            await sleep(e.seconds * 1000);
          } else {
            if (
              request.className === 'contacts.Block' ||
              request.className === 'contacts.Unblock' ||
              request.className === 'messages.DeleteChatUser' ||
              request.className === 'account.UpdatePasswordSettings' ||
              request.className === 'channels.UpdateUsername' ||
              request.className === 'channels.CreateChannel'
            ) {
              state.finished.resolve();
              throw e;
            }

            this._onError(
              `💀 FLOOD_WAIT_ERROR 💀
ACCOUNT ID: ${this._accountId}
ERROR: ${e.message}`
            );
            state.finished.resolve();
            throw e;
          }
        } else if (
          e instanceof errors.PhoneMigrateError ||
          e instanceof errors.NetworkMigrateError ||
          e instanceof errors.UserMigrateError
        ) {
          this._onError(
            `💀 PHONE_MIGRATED 💀
ACCOUNT ID: ${this._accountId}
ERROR: ${e.message}`
          );

          throw new Error(`PHONE_MIGRATED_TO: ${e.newDc}`);
        } else if (e instanceof errors.MsgWaitError) {
          await state.isReady();
          state.after = undefined;
        } else if (e.message === 'CONNECTION_NOT_INITED') {
          await this.reconnect();
        } else if (e.message === 'TIMEOUT_ERROR') {
          if (
            !(
              request.className === 'PingDelayDisconnect' ||
              request.className === 'account.UpdateStatus'
            )
          ) {
            this._onError(`💀 TIMEOUT_ERROR (${maxTimeout}ms) 💀
ID: ${this._accountId}
REQUEST: ${request.className}`);
          }

          await this.reconnect();
        } else if (e instanceof errors.TimedOutError) {
        } else {
          state.finished.resolve();
          throw e;
        }
      }

      state.resetPromise();
    }
    throw new Error(
      `REQUEST (${request.className}) WAS UNSUCCESSFUL ${attempt} TIME(S) [${es.join(', ')}]`
    );
  }

  async start() {
    if (!this.isConnected()) {
      await this.connect();
    }
  }

  uploadFile(fileParams) {
    return uploadFile(this, fileParams, false);
  }

  addEventHandler(callback, event) {
    this._eventBuilders.push([event, callback]);
  }

  _handleUpdate(update) {
    if (
      update instanceof constructors.Updates ||
      update instanceof constructors.UpdatesCombined
    ) {
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
    this._dispatchUpdate({
      update,
    });
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

  // Возвращает статистику соединений
  getConnectionStats() {
    return {
      connectCounts: this._connectCounts,
      reconnectCounts: this._reconnectCounts,
      disconnectCounts: this._disconnectCounts,
      connectErrorCounts: this._connectErrorCounts,
    };
  }
}

module.exports = TelegramClient;
