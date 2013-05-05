var train;
var signals;
(function (bus){
	signals = [new Signal(1, bus),new Signal(2, bus),new Signal(3, bus),new Signal(4, bus)]

	var lastControllerBlock = 
		new ControllerBlock(4,
			new ControllerBlock(3,
				new ControllerBlock(2, 
					new ControllerBlock(1, new NullControllerBlock()))));
	var controllerRoutes = [new ControllerRoute(1, lastControllerBlock)];
	new MainController(controllerRoutes, bus);

	var blocks = [
	new Block(1,10, new Position(0,0), State.GREEN),
	new Block(2,10, new Position(10,0),State.GREEN),
	new Block(3,10, new Position(20,0),State.GREEN),
	new Block(4,10, new Position(30,0),State.GREEN)]
	
	var route = new Route(1, blocks);
	train = new Train(new Position(-1,0), new TrainController(route, bus));
}(new Bus()));

