const PromisedWebSockets = require('../../extensions/PromisedWebSockets.js');
const AsyncQueue = require('../../extensions/AsyncQueue.js');

/**
 * The `Connection` class is a wrapper around ``asyncio.open_connection``.
 *
 * Subclasses will implement different transport modes as atomic operations,
 * which this class eases doing since the exposed interface simply puts and
 * gets complete data payloads to and from queues.
 *
 * The only error that will raise from send and receive methods is
 * ``ConnectionError``, which will raise when attempting to send if
 * the client is disconnected (includes remote disconnections).
 */
class Connection {
  PacketCodecClass = undefined;

  constructor(
    ip,
    port,
    dcId,
    accountId,
    proxy,
    onDisconnect,
    onError,
    onTraffic
  ) {
    this._ip = ip;
    this._port = port;
    this._dcId = dcId;
    this._connected = false;
    this._sendTask = undefined;
    this._recvTask = undefined;
    this._codec = undefined;
    this._obfuscation = undefined;
    this._sendArray = new AsyncQueue();
    this._recvArray = new AsyncQueue();
    this._accountId = accountId;
    this._onError = onError;
    this._onDisconnect = onDisconnect;
    this.shouldLongPoll = false;
    this.socket = new PromisedWebSockets(
      accountId,
      proxy,
      onDisconnect,
      onError,
      onTraffic
    );
  }

  isConnected() {
    return this._connected;
  }

  async _connect() {
    this._codec = new this.PacketCodecClass(this);
    await this.socket.connect(this._port, this._ip, this._accountId);
    this._initConn();
  }

  async connect() {
    await this._connect();
    this._connected = true;

    if (!this._sendTask) {
      this._sendTask = this._sendLoop();
    }
    this._recvTask = this._recvLoop();
  }

  async disconnect() {
    if (!this._connected) {
      return;
    }

    this._connected = false;
    void this._recvArray.push(undefined);
    await this.socket.close();
  }

  async send(data) {
    if (!this._connected) {
      throw new Error('NOT_CONNECTED');
    }
    await this._sendArray.push(data);
  }

  async recv() {
    while (this._connected) {
      const result = await this._recvArray.pop();
      // null = sentinel value = keep trying
      if (result) {
        return result;
      }
    }
    throw new Error('NOT_CONNECTED');
  }

  async _sendLoop() {
    try {
      while (this._connected) {
        const data = await this._sendArray.pop();
        if (!data) {
          this._sendTask = undefined;
          return;
        }
        await this._send(data);
      }
    } catch (e) {
      this._onError(`💀 SEND_LOOP_ERROR 💀
ID: ${this._accountId}
Error: ${e.message}`);
    }
  }

  async _recvLoop() {
    let data;
    while (this._connected) {
      try {
        data = await this._recv();
        if (!data) {
          throw new Error('NO_DATA_RECEIVED');
        }
      } catch (e) {
        this._onDisconnect();
        return;
      }
      await this._recvArray.push(data);
    }
  }

  toString() {
    return `${this._ip}:${this._port}/${this.constructor.name.replace(
      'Connection',
      ''
    )}`;
  }
}

class ObfuscatedConnection extends Connection {
  ObfuscatedIO = undefined;

  _initConn() {
    this._obfuscation = new this.ObfuscatedIO(this);
    this.socket.write(this._obfuscation.header);
  }

  _send(data) {
    this._obfuscation.write(this._codec.encodePacket(data));
  }

  _recv() {
    return this._codec.readPacket(this._obfuscation);
  }
}

class PacketCodec {
  constructor(connection) {
    this._conn = connection;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  encodePacket(data) {
    throw new Error('Not Implemented');

    // Override
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readPacket(reader) {
    // override
    throw new Error('Not Implemented');
  }
}

module.exports = {
  Connection,
  PacketCodec,
  ObfuscatedConnection,
};
