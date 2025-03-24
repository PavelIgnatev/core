const { HttpsProxyAgent } = require('https-proxy-agent');
const { WebSocket } = require('ws');

const closeError = new Error('WEBSOCKET_CLOSED');
const CONNECTION_TIMEOUT = 15000;
const MAX_TIMEOUT = 45000;

class PromisedWebSockets {
  constructor(accountId, proxy, disconnectCallback) {
    this._accountId = accountId;
    this._proxy = proxy;
    this.client = undefined;
    this.closed = true;
    this.disconnectCallback = disconnectCallback;
    this.timeout = CONNECTION_TIMEOUT;
  }

  async readExactly(number) {
    let readData = Buffer.alloc(0);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const thisTime = await this.read(number);
      readData = Buffer.concat([readData, thisTime]);
      number -= thisTime.length;
      if (!number) {
        return readData;
      }
    }
  }

  async read(number) {
    if (this.closed) {
      throw closeError;
    }
    await this.canRead;
    if (this.closed) {
      throw closeError;
    }
    const toReturn = this.stream.slice(0, number);
    this.stream = this.stream.slice(number);
    if (this.stream.length === 0) {
      this.canRead = new Promise((resolve) => {
        this.resolveRead = resolve;
      });
    }

    return toReturn;
  }

  getWebSocketLink(ip, port) {
    if (port === 443) {
      return `wss://${ip}:${port}/apiws`;
    }
    return `ws://${ip}:${port}/apiws`;
  }

  connect(port, ip, accountId) {
    if (typeof accountId !== 'string' || typeof this._proxy !== 'string') {
      throw new Error('PROXY_INDEX_NOT_DEFINED');
    }

    this.stream = Buffer.alloc(0);
    this.canRead = new Promise((resolve) => {
      this.resolveRead = resolve;
    });
    this.closed = false;
    this.website = this.getWebSocketLink(ip, port);

    this.client = new WebSocket(this.website, 'binary', {
      agent: new HttpsProxyAgent(this._proxy),
    });

    return new Promise((resolve, reject) => {
      let hasResolved = false;
      let timeout;
      this.client.onopen = () => {
        this.receive();
        resolve(this);
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };
      this.client.onerror = (error) => {
        reject(error);
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };
      this.client.onclose = (event) => {
        console.log({
          accountId: this._accountId,
          message: `[WEBSOCKET_CLOSED]`,
          event,
        });
        this.resolveRead?.(false);
        this.closed = true;
        if (this.disconnectCallback) {
          this.disconnectCallback();
        }
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };

      timeout = setTimeout(() => {
        if (hasResolved) return;

        this.resolveRead?.(false);
        this.closed = true;
        if (this.disconnectCallback) {
          this.disconnectCallback();
        }
        this.client?.close();

        this.timeout *= 2;
        this.timeout = Math.min(this.timeout, MAX_TIMEOUT);
        timeout = undefined;
      }, this.timeout);
    });
  }

  write(data) {
    if (this.closed) {
      throw closeError;
    }

    this.client?.send(data);
  }

  async close() {
    await this.client?.close();
    this.closed = true;
  }

  receive() {
    this.client.onmessage = async (message) => {
      this.stream = Buffer.concat([this.stream, Buffer.from(message.data)]);
      this.resolveRead?.(true);
    };
  }
}

module.exports = PromisedWebSockets;
