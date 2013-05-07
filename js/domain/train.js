var Train = function(startPosition, trainController, speed){
	this.position = startPosition;
	this.trainController = trainController;	
	this.speed = speed;
};

Train.prototype.move = function(){	
	var deltaPosition = new Position(this.speed, 0);
	if(this.trainController.canMove(this.position, deltaPosition)){
		var oldPosition = this.position;
		this.position = this.position.move(this.speed, 0);
		this.trainController.update(oldPosition, this.position);		
	}
};

Train.prototype.getPosition = function() {
	return this.position;
};