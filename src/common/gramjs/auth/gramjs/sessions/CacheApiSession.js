/* eslint-disable no-restricted-globals */
const StorageSession = require('./StorageSession');

const CACHE_NAME = 'GramJs';

class CacheApiSession extends StorageSession {
  async _delete() {
    return undefined;
  }

  async _fetchFromCache() {
    return undefined;
  }

  async _saveToCache(data) {
    return undefined;
  }
}

module.exports = CacheApiSession;
