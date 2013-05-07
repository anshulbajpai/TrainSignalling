var Train = function(startPosition, trainController, speed){
	this.position = startPosition;
	this.trainController = trainController;	
	this.speed = speed;
};

Train.prototype.move = function(){	
	var newPosition = this.position.add(new Position(this.speed, 0));
	if(this.trainController.canMove(this.position, newPosition)){
		var oldPosition = this.position;
		this.position = newPosition
		this.trainController.update(oldPosition, newPosition);		
	}
};

Train.prototype.getPosition = function() {
	return this.position;
};