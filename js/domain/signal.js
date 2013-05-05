var Signal = function(blockId, position,bus) {
	this.blockId = blockId;
	this.position = position;
	this.bus = bus;
	this.state = State.GREEN;
	this._subscribeForUpdates();
};

Signal.prototype._subscribeForUpdates = function() {
	this.bus.subscribe("state.change.block."+ this.blockId, this.onBlockUpdated, this);	
};

Signal.prototype.onBlockUpdated = function(blockId, state) {
	this.state = state;
	this.signalChangeCallback(state);
};

Signal.prototype.getPosition = function() {
	return this.position;
};

Signal.prototype.notifyStateChange = function(callback) {
	this.signalChangeCallback = callback;
};