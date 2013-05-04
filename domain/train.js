var Train = function(startPosition, trainController){
	this.position = startPosition;
	this.trainController = trainController;	
};

Train.prototype.move = function(){	
	if(this.trainController.canMove(this.position.move())){
		this.position = this.position.move();
		this.trainController.update(this.position);		
	}
};