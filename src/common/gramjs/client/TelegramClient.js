const os = require('os');
const { red, yellow } = require('colors/safe');

const { sleep } = require('../Helpers');
const errors = require('../errors');
const Helpers = require('../Helpers');
const utils = require('../Utils');

const { LAYER } = require('../tl/AllTLObjects');
const { constructors, requests } = require('../tl');
const { ConnectionTCPObfuscated, MTProtoSender } = require('../network');
const { clearAuthorizations } = require('./auth');
const { uploadFile } = require('./uploadFile');
const RequestState = require('../network/RequestState');
const { sendToBot } = require('../../../helpers/sendToBot');
const Deferred = require('../Deferred').default;

class TelegramClient {
  /**
   *
   * @param apiId
   * @param opts
   */
  constructor(session, apiId, opts) {
    if (!apiId) {
      throw Error(
        'Your API ID or Hash are invalid. Please read "Requirements" on README.md'
      );
    }
    if (typeof opts.accountId !== 'string') {
      throw new Error('Account Id not defined');
    }

    const args = {
      timeout: 10,
      requestRetries: 5,
      connectionRetries: Infinity,
      retryDelay: 1000,
      autoReconnect: true,
      ...opts,
    };

    this.session = session;
    this.apiId = parseInt(apiId, 10);
    this.defaultDcId = 2;
    this._eventBuilders = [];
    this._phoneCodeHash = {};
    this._requestRetries = args.requestRetries;
    this._connectionRetries = args.connectionRetries;
    this._retryDelay = args.retryDelay || 0;
    this._timeout = args.timeout;
    this._autoReconnect = args.autoReconnect;
    this._connection = ConnectionTCPObfuscated;
    this._accountId = args.accountId;

    this._initWith = (x) => {
      console.log(`[${this._accountId}] ${yellow('Account layer initialization')}`);
      return new requests.InvokeWithLayer({
        layer: LAYER,
        query: new requests.InitConnection({
          apiId: this.apiId,
          deviceModel:
            args.deviceModel ||
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          systemVersion: args.systemVersion || 'Win64',
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

    this._args = args;
    this._loopStarted = false;
    this._destroyed = false;
    this._connectedDeferred = new Deferred();
  }

  async connect() {
    await this._initSession();

    if (this._sender === undefined) {
      // only init sender once to avoid multiple loops.
      this._sender = new MTProtoSender(this.session.getAuthKey(), {
        logger: null,
        dcId: this.session.dcId,
        retries: this._connectionRetries,
        delay: this._retryDelay,
        autoReconnect: this._autoReconnect,
        connectTimeout: this._timeout,
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
      // we're already connected so no need to reset auth key.
      if (!this._loopStarted) {
        this._updateLoop();
        this._loopStarted = true;
      }
      return;
    }

    this.session.setAuthKey(this._sender.authKey);
    await this._sender.send(this._initWith(new requests.help.GetConfig({})));

    if (!this._loopStarted) {
      this._updateLoop();
      this._loopStarted = true;
    }
    this._connectedDeferred.resolve();
  }

  async _initSession() {
    await this.session.load();
  }

  async _updateLoop() {
    while (!this._destroyed) {
      await Helpers.sleep(10000);
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

  getSender() {
    return Promise.resolve(this._sender);
  }

  async invoke(request) {
    if (request.classType !== 'request') {
      throw new Error('You can only invoke MTProtoRequests');
    }

    const sender = this._sender;
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
          e.message === 'RPC_CALL_FAIL' ||
          e.message === 'RPC_MCGET_FAIL'
        ) {
          console.log(
            red(
              `[${this._accountId}] Telegram is having internal issues ${e.constructor.name}`
            )
          );
        } else if (
          e instanceof errors.FloodWaitError ||
          e instanceof errors.FloodTestPhoneWaitError
        ) {
          await sendToBot(
            `[${this._accountId}] !!flood wait error!! (пиздец стремная хуйня). Error: ${e.message}`
          );

          if (e.seconds <= 60) {
            console.log(
              red(`[${this._accountId}] Flood wait Error: ${e.message}`)
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
        } else if (e.message === 'CONNECTION_NOT_INITED') {
          throw new Error('CONNECTION_NOT_INITED');
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

    await clearAuthorizations(this);
  }

  uploadFile(fileParams) {
    return uploadFile(this, fileParams, false);
  }

  // event region
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

module.exports = TelegramClient;
