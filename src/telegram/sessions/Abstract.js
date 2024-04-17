class Session {
  /**
   * Creates a clone of this session file
   * @param toInstance {Session|null}
   * @returns {Session}
   */

  /* CONTEST
    clone(toInstance = null) {
        return toInstance || new this.constructor()
    } */

  /**
   * Returns the currently-used data center ID.
   */
  get dcId() {
    throw new Error("Not Implemented");
  }

  /**
   * Returns the server address where the library should connect to.
   */
  get serverAddress() {
    throw new Error("Not Implemented");
  }

  /**
   * Returns the port to which the library should connect to.
   */
  get port() {
    throw new Error("Not Implemented");
  }

  /**
   * Returns an ``AuthKey`` instance associated with the saved
   * data center, or `None` if a new one should be generated.
   */
  get authKey() {
    throw new Error("Not Implemented");
  }

  /**
   * Sets the ``AuthKey`` to be used for the saved data center.
   * @param value
   */
  set authKey(value) {
    throw new Error("Not Implemented");
  }

  /**
   * Sets the information of the data center address and port that
   * the library should connect to, as well as the data center ID,
   * which is currently unused.
   * @param dcId {number}
   * @param serverAddress {string}
   * @param port {number}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDC() {
    throw new Error("Not implemented");
  }
}

module.exports = Session;
