var Route = function(id, blocks){
	this.id = id;
	this.blocks = blocks;
};

Route.prototype.getId = function(){
	return this.id;
};

Route.prototype.updateBlock = function(blockId, state){
	var block = this.blocks.filter(function(block){
		return block.getId() === blockId;
	});
	if(block.length == 0){
		console.warn("No block found with id = " + blockId);
		return;
	}
	block.updateState(state);
};

Route.prototype.currentBlockId = function(position){
	var block = this.findBlock(position);
	if(block === null){
		throw "No currentBlockId found for given position";
		return;
	}
	return block.getId();
};

Route.prototype.findBlock = function(position){
	var matchingBlocks = this.blocks.filter(function(block){
		return block.contains(position);
	});
	if(matchingBlocks.length == 0){
		return null;
	}
	return matchingBlocks[0];
};

Route.prototype.canMove = function(position){
	var block = this.findBlock(position);
	if(block === null){
		return false;
	}
	if(block.startsWith(position)){
		return block.isSafe();
	}
	return true;
};

Route.prototype.getBlockIds = function(){
	return this.blocks.map(function(block){
		return block.getId();
	});	
};