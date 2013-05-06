var TrainElement = function(train, $trainDiv) {
	this.train = train;
	this.$trainDiv = $trainDiv;
};

TrainElement.prototype.move = function() {
    this.train.move();
	this.$trainDiv.css("left", this.train.getPosition().getX());		
	this.$trainDiv.css("top", this.train.getPosition().getY());			
};