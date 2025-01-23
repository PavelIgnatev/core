const Deferred = require('../Deferred').default;

class RequestState {
  constructor(request) {
    this.containerId = undefined;
    this.msgId = undefined;
    this.request = request;
    this.data = request.getBytes();
    this.after = undefined;
    this.result = undefined;
    this.finished = new Deferred();

    this.resetPromise();
  }

  isReady() {
    if (!this.after) {
      return true;
    }

    return this.after.finished.promise;
  }

  resetPromise() {
    // Prevent stuck await
    this.reject?.();

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

module.exports = RequestState;
