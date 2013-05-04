var Position = function(x, y){
	this.x = x;
	this.y = y;
};

Position.prototype.move = function(){	
	return this.new(1,0);
};

Position.prototype.isLessThan = function(other){	
	return this.x < other.x;
};

Position.prototype.isGreaterThan = function(other){	
	return this.x > other.x;
};

Position.prototype.new = function(deltaX, deltaY){	
	return new Position(this.x + deltaX, this.y + deltaY);
};

Position.prototype.equals = function(other){	
	if(other === undefined || other === null || !(other instanceof Position)){
		return false;
	}
	return this.x === other.x && this.y === other.y;
};