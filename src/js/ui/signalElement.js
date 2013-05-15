var SignalElement = function(blockId, position, bus) {
	this.blockId = blockId;
	this.position = position;
	this.bus = bus;	
	this.$signalDiv = this._createSignalDiv();
	this._subscribeForUpdates();
};

SignalElement.prototype._createSignalDiv = function() {
	$signalDiv = $('<div id="signal'+ this.blockId+'"></div>');
	$signalDiv.addClass("signal");
	$signalDiv.css("background-color", "green");		
	$signalDiv.css("left", this.position.getX());		
	$signalDiv.css("top", this.position.getY());				
	return $signalDiv;
};

SignalElement.prototype._subscribeForUpdates = function() {
	this.bus.subscribe("state.change.block."+ this.blockId, this.onBlockUpdated, this);	
};

SignalElement.prototype.onBlockUpdated = function(blockId, state) {
	this.$signalDiv.css("background-color", state.toLowerCase());		
};

SignalElement.prototype.getUIElement = function() {
	return this.$signalDiv;
};