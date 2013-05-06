var Train = function(startPosition, trainController, speed){
	this.position = startPosition;
	this.trainController = trainController;	
	this.speed = speed;
};

Train.prototype.move = function(){	
	if(this.trainController.canMove(this.position.move(1, 0))){
		this.position = this.position.move(this.speed, 0);
		this.trainController.update(this.position);		
	}
};

Train.prototype.getPosition = function() {
	return this.position;
};