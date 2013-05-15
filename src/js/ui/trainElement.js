var TrainElement = function(train, id) {
	this.train = train;
	this.id = id;
	this.$trainDiv = this._createTrainDiv();
};

TrainElement.prototype.move = function() {
	this.train.move();
	this.$trainDiv.css("left", this.train.getPosition().getX());		
	this.$trainDiv.css("top", this.train.getPosition().getY());			
};

TrainElement.prototype._createTrainDiv = function() {
	var $trainDiv = $('<div id="'+ this.id +'"></div>');
	$trainDiv.addClass("train");
	$trainDiv.css("left", this.train.getPosition().getX());		
	$trainDiv.css("top", this.train.getPosition().getY());	
	return $trainDiv;
};

TrainElement.prototype.getUIElement = function() {
	return this.$trainDiv;
};
