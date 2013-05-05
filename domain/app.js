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
	var train1 = new Train(new Position(leftOffset - 1, topOffset), new TrainController(route, bus));
	var train2 = new Train(new Position(leftOffset - 1, topOffset), new TrainController(route, bus));

	var $train1Div = $('<div id="train1"></div>');
	$train1Div.addClass("train");
	$train1Div.css("background-color", "brown");
	$train1Div.css("left", train1.getPosition().getX());		
	$train1Div.css("top", train1.getPosition().getY());	
	$main.append($train1Div);

	var $train2Div = $('<div id="train2"></div>');
	$train2Div.addClass("train");
	$train2Div.css("background-color", "brown");
	$train2Div.css("left", train2.getPosition().getX());		
	$train2Div.css("top", train2.getPosition().getY());	
	$main.append($train2Div);

	var timer1 = setInterval(function() {
		train1.move();
		$train1Div.css("left", train1.getPosition().getX());		
		$train1Div.css("top", train1.getPosition().getY());			
	}, 25);

	setTimeout(function(){
		var timer2 = setInterval(function() {
			train2.move();
			$train2Div.css("left", train2.getPosition().getX());		
			$train2Div.css("top", train2.getPosition().getY());			
		}, 50);		
	}, 2000); 

});