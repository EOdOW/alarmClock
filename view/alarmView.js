var AlarmView = function(model){
	var scope = this;
	this.model = model;
	this.currentDial = 'hours';

	this.hourClockModel = new ClockModel('hours');
	this.hourClockView = new ClockView(this.hourClockModel);

	this.minuteClockModel = new ClockModel('minutes');
	this.minuteClockView = new ClockView(this.minuteClockModel);

	this.hourClockView.on('hover', function(args){
		var data = args[1];
		document.getElementById(data.type).innerHTML = data.text;
	});

	this.minuteClockView.on('hover', function(args){
		var data = args[1];
		
		if(data === 1)
			data.text = '0' + data.text;
		
		document.getElementById(data.type).innerHTML = data.text;
	});

	this.hourClockView.on('chosen', function(args){
		var data = args[1];
		
		if (data.type === 'periods') {
			scope.model.setPeriod(data.text);
		} else {
			scope.toggleDial();
		}
		
	});

	document.getElementById('minutes').addEventListener('click', this.toggleDial);

	this.hourClockView.draw();
	this.minuteClockView.draw(true);

	EventObj.call(this);
};

AlarmView.prototype = new EventObj();

AlarmView.prototype.constructor = AlarmView;

AlarmView.prototype.toggleDial = function(){
	if (this.currentDial === 'hours') {
		this.hourClockView.hide();
		this.minuteClockView.show();
		this.currentDial = 'minutes';
	} else {
		this.hourClockView.show();
		this.minuteClockView.hide();
		this.currentDial = 'hours';
	}
}