var RouteController = function(routes, bus;){

	var subscribeForUpdates = function(){
		var self = this;
		routes.forEach(function(route){
			bus.subscribe("updatePosition",self.onRouteUpdate, self);
		});
	};

	var onRouteUpdate = function(routeId, blockId, position){
		var route = routes.filter(function(route){
			return route.getId() === routeId;
		})[0];
	};
	
	subscribeForUpdates();
};


