var TrainController = function(route, bus){
	this.route = route;
	this.bus = bus;	
	this._subscribeForUpdates();
};

TrainController.prototype._subscribeForUpdates = function(){
	var self = this;
	this.route.getBlockIds().forEach(function(blockId){
		self.bus.subscribe("route."+self.route.getId() + ".block."+blockId,self._onBlockUpdated, self);
	});
};

TrainController.prototype._subscribeForEachBlock = function(blockId){
	this.subscriptionTemplate({})
};

TrainController.prototype.canMove = function(position){
	return this.route.canMove(position);
};

TrainController.prototype.update = function(position){
	this.bus.trigger("update.route."+this.route.getId() + ".block."+this.route.currentBlockId(), [position]);
};

TrainController.prototype._onBlockUpdated = function(blockId, state){
	this.route.updateBlock(blockId, state);	
}; 