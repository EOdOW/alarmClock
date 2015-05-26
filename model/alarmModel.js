var AlarmModel = function(time, minutes, hours, period){
	this.time = time;
	this.minutes = minutes;
	this.hours = hours;
	this.period = period;

	EventObj.call(this);
};

AlarmModel.prototype = new EventObj();

AlarmModel.prototype.constructor = AlarmModel;

AlarmModel.prototype.setPeriod = function(period) {
	this.period = period;	
};

AlarmModel.prototype.setTime = function(time) {
	this.time = time;	
};