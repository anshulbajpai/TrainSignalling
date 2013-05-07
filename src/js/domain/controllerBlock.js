var ControllerBlock = function(id, previousBlock) {
	this.id = id;
	this.previousBlock = previousBlock;
};

ControllerBlock.prototype.getId = function() {
	return this.id;
};

ControllerBlock.prototype.previous = function() {
	return this.previousBlock;
};

ControllerBlock.prototype.findBlock = function(blockId) {
	if(this.id === -1){
		return null;
	}
	if(this.id === blockId){
		return this;
	}
	return this.previousBlock.findBlock(blockId);
};

var NullControllerBlock = function(){};

NullControllerBlock.prototype = new ControllerBlock(-1, null);

NullControllerBlock.prototype.previous = function(){
	return this;
};
