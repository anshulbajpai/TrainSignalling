var Bus = function(){
	var registry = {};

	this.subscribe = function(event, callback, object){
		this.unsubscribe(event, callback, object);
		if(registry[event] === undefined){
			registry[event] = [{object : callback}];
		}
		else{
			registry[event].push({object : callback});
		}
	};

	this.unsubscribe = function(event, callback, object){
		var eventSubscribers = registry[event];
		if(eventSubscribers !== undefined){
			var index = indexOf(object,callback);
			if(index >= 0){
				eventSubscribers.splice(index, 1);
				if(eventSubscribers.length === 0){
					delete registry[event];
				}			
			}
		}
	};

	var indexOf = function(object, callback){
		var eventSubscribers = registry[event];
		var indexFound = -1;
		eventSubscribers.every(function(e,i,a){
			if(e[object] === callback){
				indexFound = i;
				return false;
			}
			return true;
		});
		return indexFound;
	};

	this.trigger = function(event, params){
		var eventSubscribers = registry[event];
		if(eventSubscribers !== undefined){
			eventSubscribers.forEach(function(e){
				var targetObject = Object.keys(e)[0];
				e[targetObject].apply(targetObject,params);
			});
		}
	};
}