var Position = function(x, y){
	this.x = x;
	this.y = y;
};

Position.prototype.getX = function() {
	return this.x;
};

Position.prototype.getY = function() {
	return this.y;
};

Position.prototype.add = function(position){	
	return new Position(this.x + position.x, this.y + position.y);
};

Position.prototype.isLessThan = function(other){	
	return this.x < other.x;
};

Position.prototype.isGreaterThan = function(other){	
	return this.x > other.x;
};

Position.prototype.equals = function(other){	
	if(other === undefined || other === null || !(other instanceof Position)){
		return false;
	}
	return this.x === other.x && this.y === other.y;
};