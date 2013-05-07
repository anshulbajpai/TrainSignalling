var ControllerRoute = function(id, lastControllerBlock){
	this.id = id;
	this.lastControllerBlock = lastControllerBlock;
};

ControllerRoute.prototype.getId = function() {
	return this.id;
};

ControllerRoute.prototype.findBlock = function(blockId) {
	return this.lastControllerBlock.findBlock(blockId);
};