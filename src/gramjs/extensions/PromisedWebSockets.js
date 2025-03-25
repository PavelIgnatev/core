const { HttpsProxyAgent } = require('https-proxy-agent');
const { WebSocket } = require('ws');

const closeError = new Error('WEBSOCKET_CLOSED');

class PromisedWebSockets {
  constructor(accountId, proxy, onDisconnect, onError, onTraffic) {
    this.client = undefined;
    this.closed = true;
    this._accountId = accountId;
    this._proxy = proxy;
    this._onDisconnect = onDisconnect;
    this._onError = onError;
    this._onTraffic = onTraffic;
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
        this.resolveRead?.(false);
        this.closed = true;
        // if (this._onDisconnect) {
        //   this._onDisconnect();
        // }
        hasResolved = true;
        if (timeout) clearTimeout(timeout);
      };

      timeout = setTimeout(() => {
        if (hasResolved) return;

        this.resolveRead?.(false);
        this.closed = true;
        // if (this._onDisconnect) {
        //   this._onDisconnect();
        // }
        this.client?.close();

        timeout = undefined;

        this._onError(`** CONNECTION_FAILED **
ID: ${accountId}`);
      }, 15000);
    });
  }

  write(data) {
    if (this.closed) {
      throw closeError;
    }

    this.client?.send(data);

    if (this._onTraffic) {
      this._onTraffic('sent', data.length);
    }
  }

  async close() {
    await this.client?.close();
    this.client = undefined;
    this.closed = true;
  }

  receive() {
    this.client.onmessage = async (message) => {
      const data = Buffer.from(message.data);
      const dataSize = data.length;

      this.stream = Buffer.concat([this.stream, data]);
      this.resolveRead?.(true);

      if (this._onTraffic) {
        this._onTraffic('received', dataSize);
      }
    };
  }
}

module.exports = PromisedWebSockets;
