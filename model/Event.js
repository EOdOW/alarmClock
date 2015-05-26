var EventObj = function(){
	this.events = {};
};

EventObj.prototype.on = function(name, callback, context) {
	if(!this.events[name])
		this.events[name] = [];

	this.events[name].push({callback: callback, context: context});
};

EventObj.prototype.trigger = function(name) {
	var args = arguments;

	if(!this.events[name])
		return;

	this.events[name].forEach(function(ev){
		ev.callback.call(ev.context, args);
	});
};