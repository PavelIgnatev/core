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
    onError
  ) {
    if (typeof acountId !== 'string' || typeof onError !== 'function') {
      throw new Error('Account Id or onError not defined');
    }

    this.apiId = apiId;
    this.defaultDcId = 2;
    this.specialDcId = specialdcId;
    this.session = session;
    this._accountId = acountId;
    this._prefix = prefix;
    this._eventBuilders = [];
    this._phoneCodeHash = {};
    this._requestRetries = 5;
    this._connectionRetries = Infinity;
    this._retryDelay = 1000;
    this._connection = ConnectionTCPObfuscated;
    this._onError = onError;
    this._initTime = 0;
    this._endTime = 0;

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

  async connect() {
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
        onError: this._onError,
        working: this.session._working,
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
      this._accountId,
      this._onError
    );

    const newConnection = await this._sender.connect(connection, undefined);
    if (!newConnection) {
      this._onError(`💀 NEW_CONNECTION_NOT_FOUND 💀
ID: ${this._accountId}`);
      return;
    }

    this.session.setAuthKey(this._sender.authKey);
    await this._sender.send(this._initWith(new requests.help.GetConfig({})));
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
      await this._sender.disconnect();
    }
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
      request.className === 'account.UpdateStatus' ? 10000 : 90000;
    const state = new RequestState(request);

    let attempt = 0;
    for (attempt = 0; attempt < this._requestRetries; attempt++) {
      this._sender.addStateToQueue(state);
      try {
        const result = await Promise.race([
          state.promise,
          new Promise((_, r) =>
            setTimeout(() => {
              if (
                this._sender._user_connected &&
                !this._sender.isReconnecting
              ) {
                r(new Error('TIMEOUT_ERROR'));
              }
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
          this._sender._connectErrorCounts += 1;

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
          await this.disconnect();
          await sleep(2000);
          await this.connect();
        } else if (e.message === 'TIMEOUT_ERROR') {
          if (request.className !== 'account.UpdateStatus') {
            this._onError(`💀 TIMEOUT_ERROR (${maxTimeout}ms) 💀
ID: ${this._accountId}
REQUEST: ${request.className}`);
          }

          await this._sender.reconnect();
        } else if (e instanceof errors.TimedOutError) {
        } else {
          state.finished.resolve();
          throw e;
        }
      }

      state.resetPromise();
    }
    throw new Error(
      `Request (${request.className}) was unsuccessful ${attempt} time(s) [${es.join(', ')}]`
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
}

module.exports = TelegramClient;
