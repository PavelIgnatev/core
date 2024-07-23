class UpdateConnectionState {
    static disconnected = -1;

    static connected = 1;

    static broken = 0;

    constructor(state, origin) {
        this.state = state;
        this.origin = origin;
        this.className = "UpdateConnectionState"
    }
}

class UpdateServerTimeOffset {
    constructor(timeOffset) {
        this.timeOffset = timeOffset;
    }
}

module.exports = {
    UpdateConnectionState,
    UpdateServerTimeOffset,
};
