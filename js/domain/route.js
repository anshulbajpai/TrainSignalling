var Route = function(id, blocks){
	this.id = id;
	this.blocks = blocks;
};

Route.prototype.getId = function(){
	return this.id;
};

Route.prototype.canMove = function(currentPosition, newPosition){
	var nextBlock = this.findBlockByPosition(newPosition);
	if(nextBlock === null){
		return false;
	}
	if(this.areNotOnSameBlock(currentPosition, newPosition)){
		return nextBlock.isSafe();
	}
	return true;
};

Route.prototype.updateBlock = function(blockId, state){
	var block = this._findBlockById(blockId);
	if(block === null){
		console.warn("No block found with id = " + blockId + "to updateBlock");
		return;
	}
	block.updateState(state);
};

Route.prototype.currentBlockId = function(position){
	var block = this.findBlockByPosition(position);
	if(block === null){
		throw "No currentBlockId found for given position";
		return;
	}
	return block.getId();
};

Route.prototype.findBlockByPosition = function(position){
	return this._findBlockBy(function(block){
		return block.contains(position);
	});
};

Route.prototype._findBlockById = function(blockId){
	return this._findBlockBy(function(block){
		return block.getId() === blockId;
	});
};

Route.prototype._findBlockBy = function(predicate){
	var matchingBlocks = this.blocks.filter(predicate);
	if(matchingBlocks.length == 0){
		return null;
	}
	return matchingBlocks[0];
};

Route.prototype.getBlockIds = function(){
	return this.blocks.map(function(block){
		return block.getId();
	});	
};

Route.prototype.areNotOnSameBlock = function(firstPosition, secondPosition) {
	var currentBlock = this.findBlockByPosition(firstPosition);
	var nextBlock = this.findBlockByPosition(secondPosition);
	if(currentBlock == null || nextBlock === null){
		return true;
	}
	return !nextBlock.equals(currentBlock);
};