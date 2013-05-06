var UIController = function(bus) {

	var $route = $('#route');
	var $main = $('#main');
	var leftOffset = $route.position().left;
	var topOffset = $route.position().top
	var blockCount = 9;
	var blockLength = 100;

	this.init = function() {
		createSignals();
		createMainController();
		var route = createRoute();
		var train1 = createTrainElement("train1", route, 1);
		var train2 = createTrainElement("train2", route, 2);

		setInterval(function() {
			train1.move();
		}, 30);

		setTimeout(function(){
			setInterval(function() {
				train2.move();
			}, 25);		
		}, 1000); 
	};

	var createRoute = function() {
		var blocks = [];
		for(var i = 1; i <= blockCount; i++){
			blocks.push(new Block(i,blockLength, new Position((i-1)*blockLength + leftOffset,topOffset), State.GREEN));
		}	
		return new Route(1, blocks);
	};

	var createTrainElement = function(id, route, speed) {
		var train = new Train(new Position(leftOffset - 1, topOffset), new TrainController(route, bus), speed);		
		var $trainDiv = createTrainDiv(train, id);
		return new TrainElement(train, $trainDiv);
	};

	var createTrainDiv = function(train, id) {
		var $trainDiv = $('<div id="'+ id +'"></div>');
		$trainDiv.addClass("train");
		$trainDiv.css("background-color", "brown");
		$trainDiv.css("left", train.getPosition().getX());		
		$trainDiv.css("top", train.getPosition().getY());	
		$main.append($trainDiv);
		return $trainDiv;
	};

	var createMainController = function() {
		var controllerRoutes = [new ControllerRoute(1, createControllerBlock())];
		new MainController(controllerRoutes, bus);
	};

	var createControllerBlock = function() {
		var lastControllerBlock = new NullControllerBlock();
		for (var i = 1; i <= blockCount; i++) {
			lastControllerBlock = new ControllerBlock(i, lastControllerBlock)
		};
		return lastControllerBlock;
	};

	var createSignals = function() {
		for(var i = 1; i <= blockCount; i++){
			var signal = new Signal(i, new Position((i-1)*blockLength + leftOffset,topOffset), bus);
			createSignalDiv(signal, i);
		}
	};

	var createSignalDiv = function(signal, index) {
		var $signalDiv = $('<div id="signal'+ index+'"></div>');
		$signalDiv.addClass("signal");
		$signalDiv.css("background-color", "green");		
		$signalDiv.css("left", signal.getPosition().getX());		
		$signalDiv.css("top", signal.getPosition().getY());				
		$main.append($signalDiv);
		signal.notifyStateChange(function(state) {
			$signalDiv.css("background-color", state.toLowerCase());		
		});
	};

};