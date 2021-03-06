var Block = function(id, length, startPosition, state){
	this.id = id;
	this.startPosition = startPosition;
	this.length = length;
	this.state = state;
};

Block.prototype.getId = function(){
	return this.id;
};

Block.prototype.updateState = function(state){
	return this.state = state;
};

Block.prototype.isSafe = function(){
	return this.state === State.GREEN;
};

Block.prototype.contains = function(position){
	return !position.isLessThan(this.startPosition) && !position.isGreaterThan(this._lastPosition());
};

Block.prototype._lastPosition = function(){
	return this.startPosition.add(new Position(this.length-1, 0));
};

Block.prototype.occupy = function(){
	this.state = State.RED;
};

Block.prototype.equals = function(other){
	if(other === undefined || other === null || !(other instanceof Block)){
		return false;
	}
	return this.id === other.id;
};