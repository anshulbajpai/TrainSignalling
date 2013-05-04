var Route = function(id, blocks){
	this.id = id;
	this.currentBlockIndex = 0;
	this.blocks = blocks;
};

Route.prototype._isSafe = function(position){
	if(this._currentBlockContains(position)){
		return true;
	}
	if(!this._isOnLastBlock()){
		return this.blocks[this.currentBlockIndex + 1].isSafe(); 
	}
	return false;
};

Route.prototype._isOnLastBlock = function(){
	return (this.blocks.length -1) === this.currentBlockIndex;
};

Route.prototype._isEnd = function(position){
	if(!this._isOnLastBlock()){
		return false;
	}
	return this.blocks[this.currentBlockIndex].isLastPosition(position);
};

Route.prototype.canMove = function(position){
	return !this._isEnd(position) && this._isSafe(position);
};

Route.prototype.update = function(position){
	if(!this._currentBlockContains(position)){
		this.currentBlockIndex = this.currentBlockIndex + 1;		
	}
};

Route.prototype._currentBlockContains = function(position){
	return this.blocks[this.currentBlockIndex].contains(position);
};

Route.prototype.getBlockIds = function(){
	return this.blocks.map(function(block){
		return block.getId();
	}); 
};

Route.prototype.getId = function(){
	return this.id;
};

Route.prototype.updateBlock = function(blockId, state){
	var block = this.blocks.filter(function(block){
		return block.getId() === blockId;
	})[0];
	block.updateState(state);
};

Route.prototype.currentBlockId = function(){
	return this.blocks[this.currentBlockIndex].getId();
};