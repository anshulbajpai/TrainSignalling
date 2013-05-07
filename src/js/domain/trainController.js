var TrainController = function(route, bus){
	this.route = route;
	this.bus = bus;	
	this._subscribeForUpdates();
};

TrainController.prototype._subscribeForUpdates = function(){
	var self = this;
	this.route.getBlockIds().forEach(function(blockId){
		self.bus.subscribe("state.change.block."+ blockId, self.onBlockUpdated, self);	
	});	
};

TrainController.prototype.canMove = function(currentPosition, newPosition){
	return this.route.canMove(currentPosition, newPosition);
};

TrainController.prototype.update = function(oldPosition, newPosition){
	var nextBlock = this.route.findBlockByPosition(newPosition);
	if(this.route.areNotOnSameBlock(oldPosition, newPosition)){
		this.bus.trigger("block.occupied",[this.route.getId(),nextBlock.getId()]);
	}
};

TrainController.prototype.onBlockUpdated = function(blockId, state){
	this.route.updateBlock(blockId, state);	
}; 