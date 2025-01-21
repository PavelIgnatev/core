const UserAgent = require('user-agents');

const { sleep } = require('../Helpers');
const errors = require('../errors');

const { LAYER } = require('../tl/AllTLObjects');
const { constructors, requests } = require('../tl');
const { ConnectionTCPObfuscated, MTProtoSender } = require('../network');
const { uploadFile } = require('./uploadFile');
const RequestState = require('../network/RequestState');
const { sendToMainBot } = require('../../../helpers/sendToMainBot');

class TelegramClient {
  constructor(session, acountId) {
    if (typeof acountId !== 'string') {
      throw new Error('Account Id not defined');
    }

    this.apiId = 2496;
    this.defaultDcId = 2;
    this.session = session;
    this._accountId = acountId;
    this._eventBuilders = [];
    this._phoneCodeHash = {};
    this._requestRetries = 5;
    this._connectionRetries = Infinity;
    this._retryDelay = 1000;
    this._connection = ConnectionTCPObfuscated;

    this._initWith = (x) => {
      const userAgent = new UserAgent();

      return new requests.InvokeWithLayer({
        layer: LAYER,
        query: new requests.InitConnection({
          apiId: this.apiId,
          deviceModel: userAgent.userAgent,
          systemVersion: userAgent.platform,
          appVersion: `${Math.floor(Math.random() * 10)}.${Math.floor(
            Math.random() * 10
          )}.${Math.floor(Math.random() * 10)} A`,
          langCode: 'en',
          langPack: 'weba',
          systemLangCode: 'en',
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
      this._accountId
    );

    const newConnection = await this._sender.connect(connection, undefined);
    if (!newConnection) {
      return;
    }

    this.session.setAuthKey(this._sender.authKey);
    await this._sender.send(this._initWith(new requests.help.GetConfig({})));
  }

  async _initSession() {
    await this.session.load();
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

  /**
   * Disconnects all senders and removes all handlers
   * @returns {Promise<void>}
   */
  async destroy() {
    try {
      await this.disconnect();
      this._sender.destroy();
    } catch {}

    this.session.delete();
    this._eventBuilders = [];
  }

  getSender() {
    return Promise.resolve(this._sender);
  }

  async invoke(request) {
    if (request.classType !== 'request') {
      throw new Error('You can only invoke requests');
    }

    const state = new RequestState(request);
    let attempt = 0;
    for (attempt = 0; attempt < this._requestRetries; attempt++) {
      this._sender.addStateToQueue(state);
      try {
        const result = await state.promise;
        state.finished.resolve();
        return result;
      } catch (e) {
        if (
          e instanceof errors.ServerError ||
          e.message === 'RPC_CALL_FAIL' ||
          e.message === 'RPC_MCGET_FAIL'
        ) {
          await sendToMainBot(
            `💀 SERVER_ERROR 💀
ACCOUNT ID: ${this._accountId}
ERROR: ${e.message}`
          );
        } else if (
          e instanceof errors.FloodWaitError ||
          e instanceof errors.FloodTestPhoneWaitError
        ) {
          if (
            request.className === 'contacts.Block' ||
            request.className === 'contacts.Unblock'
          ) {
            state.finished.resolve();
            throw e;
          }

          if (e.seconds <= 60) {
            await sleep(e.seconds * 1000);
          } else {
            await sendToMainBot(
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
          await sendToMainBot(
            `💀 PHONE_MIGRATED 💀
ACCOUNT ID: ${this._accountId}
ERROR: ${e.message}`
          );

          throw new Error(`PHONE_MIGRATED_TO: ${e.newDc}`);
        } else if (e instanceof errors.MsgWaitError) {
          await sendToMainBot(
            `💀 MSG_WAIT_ERROR 💀
ACCOUNT ID: ${this._accountId}
ERROR: ${e.message}`
          );
          await state.isReady();
          state.after = undefined;
        } else if (e.message === 'CONNECTION_NOT_INITED') {
          await this.disconnect();
          await sleep(2000);
          await this.connect();
        } else if (e instanceof errors.TimedOutError) {
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
