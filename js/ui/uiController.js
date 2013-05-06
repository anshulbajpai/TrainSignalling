var UIController = function(bus) {

	var $route = $('#route');
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
		}, 10);

		setTimeout(function(){
			setInterval(function() {
				train2.move();
			}, 10);		
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
		return new TrainElement(train, id);
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
			new SignalElement(i, new Position((i-1)*blockLength + leftOffset,topOffset), bus);
		}
	};
};