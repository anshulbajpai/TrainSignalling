var train
(function (bus){
	var blocks = [
	new Block(1,10, new Position(0,0), State.GREEN),
	new Block(2,10, new Position(10,0),State.GREEN),
	new Block(3,10, new Position(20,0),State.GREEN),
	new Block(4,10, new Position(30,0),State.GREEN)]

	var route = new Route(1, blocks);
	
	train = new Train(new Position(0,0), new TrainController(route, bus));
}(new Bus()));

