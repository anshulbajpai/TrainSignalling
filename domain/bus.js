var Bus = function(){

	var CallBackObject = function(object, callback){
		this.object = object;
		this.callback =callback;
	}

	CallBackObject.prototype.getObject = function() {
		return this.object;
	};

	CallBackObject.prototype.getCallback = function() {
		return this.callback;
	};

	CallBackObject.prototype.equals = function(other){	
		if(other === undefined || other === null || !(other instanceof CallBackObject)){
			return false;
		}
		return this.object === other.object && this.callback === other.callback;
	};


	var registry = {};

	this.subscribe = function(event, callback, object){
		this.unsubscribe(event, callback, object);
		if(registry[event] === undefined){
			registry[event] = [new CallBackObject(object, callback)];
		}
		else{
			registry[event].push(new CallBackObject(object, callback));
		}
	};

	this.unsubscribe = function(event, callback, object){
		var eventSubscribers = registry[event];
		if(eventSubscribers !== undefined){
			var index = indexOf(event, object,callback);
			if(index >= 0){
				eventSubscribers.splice(index, 1);
				if(eventSubscribers.length === 0){
					delete registry[event];
				}			
			}
		}
	};

	var indexOf = function(event, object, callback){
		var eventSubscribers = registry[event];
		var indexFound = -1;
		eventSubscribers.every(function(e,i,a){
			if(e.equals(new CallBackObject(object, callback))){
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
				var callback = e.getCallback();
				callback.apply(e.getObject(),params);
			});
		}
	};
}