$(function() {
	var bus = new Bus();
	var signals = [];
	var $route = $('#route');
	var $main = $('#main');
	var leftOffset = $route.position().left;
	var topOffset = $route.position().top
	var blockCount = 9;
	var blockLength = 100;

	for(var i = 1; i <= blockCount; i++){
		signals.push(new Signal(i, new Position((i-1)*blockLength + leftOffset,topOffset), bus));
	}

	signals.forEach(function(signal, index) {
		var $signalDiv = $('<div id="signal'+ index+'"></div>');
		$signalDiv.addClass("signal");
		$signalDiv.css("background-color", "green");		
		$signalDiv.css("left", signal.getPosition().getX());		
		$signalDiv.css("top", signal.getPosition().getY());		
		$main.append($signalDiv);
		signal.notifyStateChange(function(state) {
			$signalDiv.css("background-color", state.toLowerCase());		
		});
	});	

	var lastControllerBlock = new NullControllerBlock();
	for (var i = 1; i <=blockCount; i++) {
		lastControllerBlock = new ControllerBlock(i, lastControllerBlock)
	};

	var controllerRoutes = [new ControllerRoute(1, lastControllerBlock)];
	new MainController(controllerRoutes, bus);

	var blocks = [];
	for(var i = 1; i <= blockCount; i++){
		blocks.push(new Block(i,blockLength, new Position((i-1)*blockLength + leftOffset,topOffset), State.GREEN));
	}	
	
	var route = new Route(1, blocks);
	var train = new Train(new Position(leftOffset - 1, topOffset), new TrainController(route, bus));

	var $trainDiv = $('<div></div>');
	$trainDiv.addClass("train");
	$trainDiv.css("background-color", "brown");
	$trainDiv.css("left", train.getPosition().getX());		
	$trainDiv.css("top", train.getPosition().getY());	
	$main.append($trainDiv);

	var timer = setInterval(function() {
		train.move();
		$trainDiv.css("left", train.getPosition().getX());		
		$trainDiv.css("top", train.getPosition().getY());			
	}, 25);
});