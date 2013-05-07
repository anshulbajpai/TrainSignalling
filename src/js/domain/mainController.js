var MainController = function(routes, bus){

	var self = this;
	var subscribeForUpdates = function(){
		bus.subscribe("block.occupied", self.onBlockOccupy, self);
	};

	this.onBlockOccupy = function(routeId, blockId){
		var matchingRoutes = routes.filter(function(route){
			return route.getId() === routeId;
		});
		if(matchingRoutes.length === 0){
			console.warn("No route found with id = " + routeId);
			return;
		}
		var route = matchingRoutes[0];
		var redBlock = route.findBlock(blockId);
		if(redBlock === null){
			console.warn("No block found with id = " + blockId + " in route id = " + routeId);
			return;	
		}
		bus.trigger("state.change.block." + blockId, [blockId, State.RED]);
		var orangeBlock = redBlock.previous();		
		bus.trigger("state.change.block." +orangeBlock.getId(), [orangeBlock.getId(), State.ORANGE]);
		var yellowBlock = orangeBlock.previous();		
		bus.trigger("state.change.block." +yellowBlock.getId(), [yellowBlock.getId(), State.YELLOW]);
		var greenBlock = yellowBlock.previous();		
		bus.trigger("state.change.block." +greenBlock.getId(), [greenBlock.getId(), State.GREEN]);
	};
	subscribeForUpdates();
};


