var Signal = function(blockId, bus) {
	this.blockId = blockId;
	this.bus = bus;
	this.state = State.GREEN;
	this._subscribeForUpdates();
};

Signal.prototype._subscribeForUpdates = function() {
	this.bus.subscribe("state.change.block."+ this.blockId, this.onBlockUpdated, this);	
};

Signal.prototype.onBlockUpdated = function(blockId, state) {
	this.state = state;
};