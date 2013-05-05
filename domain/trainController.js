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

TrainController.prototype.canMove = function(position){
	return this.route.canMove(position);
};

TrainController.prototype.update = function(position){
	var block = this.route.findBlockByPosition(position);
	if(block === null){
		throw "No block found to mark occupied";
	}
	if(block.startsWith(position)){
		this.bus.trigger("block.occupied",[this.route.getId(),block.getId()]);
	}
};

TrainController.prototype.onBlockUpdated = function(blockId, state){
	this.route.updateBlock(blockId, state);	
}; 