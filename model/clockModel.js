var timeTypes = {
	hours: ['3','4','5','6','7','8','9','10','11','12','1','2'],
	minutes: ['15','20','25','30','35','40','45','50','55','00','5','10']
};

var ClockModel = function(type){
	this.radius = 80;
	this.type = type;

	this.data = [{
		text: '',
		radius: this.radius,
		cx: 100,
		cy: 100,
		className: 'dial',
		timeData: [],
		periods: [{
			type: 'periods',
			text: 'AM',
			radius: 20,
			cx: 25,
			cy: 175,
			className: 'period'
		},{
			type: 'periods',
			text: 'PM',
			radius: 20,
			cx: 175,
			cy: 175,
			className: 'period'
		}]
	}];

	EventObj.call(this);
};

ClockModel.prototype = new EventObj();

ClockModel.prototype.constructor = ClockModel;

ClockModel.prototype.getData = function() {
	var scope = this;
	
	timeTypes[this.type].forEach(function(t, idx){

		var coordinates = scope.getCoordinate(t, idx);

		scope.data[0].timeData.push({
			value: t,
			text: t + '',
			cx: coordinates[0],
			cy: coordinates[1],
			radius: 15,
			className: 'digit',
			type: scope.type
		})
	});

	return this.data;
};

ClockModel.prototype.getCoordinate = function(time, idx) {
	var r = this.radius;
	var x = 100+Math.round((r-20)*Math.cos(30*idx*Math.PI/180));
	var y = 100+Math.round((r-20)*Math.sin(30*idx*Math.PI/180));

	return [x, y];
};

ClockModel.prototype.setPeriod = function(period){
	this.data.currentPeriod = period;
};