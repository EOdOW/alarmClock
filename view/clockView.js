var ClockView = function(model){
	this.model = model;
	this.type = this.model.type;
	this.svgContainer = d3.select('svg #' + this.type + '_clock');
	this.clockData = this.model.getData();
	this.hidden = false;

	EventObj.call(this);
};

ClockView.prototype = new EventObj();

ClockView.prototype.constructor = ClockView;

ClockView.prototype.draw = function(hidden) {
	this.hidden = hidden === true;

	//draw outer dial circle
	this.drawCircle(this.svgContainer, this.clockData);
	//draw circle for each digit
	this.drawCircle(this.svgContainer, this.clockData[0].timeData);

	this.drawCircle(this.svgContainer, this.clockData[0].periods, 'periods');

	this.svgContainer.attr('display', this.hidden ? 'none' : 'block');
};

ClockView.prototype.drawCircle = function(svgContainer, data, gClass) {
	var scope = this;
	var groupClass = gClass || 'clock';
	var group;
	var newGroup;

	group = svgContainer.selectAll('g.' + groupClass)
		.data(data, function(d){return d.text;});

	newGroup = group.enter()
		.append('g');

	group.exit().remove();

	newGroup
		.classed(groupClass, true);
		
	newGroup.append('circle')
		.attr('class', function(d){return d.className;})
		.attr('r', function(d){return d.radius;})
		.attr('cx', function(d){return d.cx;})
		.attr('cy', function(d){return d.cy;})
		.on('click', function(d){
			if (d.text) {
				scope.trigger('chosen', d);
				d3.selectAll('.' + groupClass + '.chosen').classed('chosen', false);
				d3.select(this).classed('chosen', true);
			}	
		})
		.on('mouseover', function(d){
			console.log('OVER');
			if(d.text)
				scope.trigger('hover', d);
		});
			
	newGroup.append('text')
		.attr('dx', function(d){return d.cx;})
		.attr('dy', function(d){return d.cy;})
		.text(function(d){return d.text;});
};

ClockView.prototype.hide = function() {
	this.hidden = true;
	this.svgContainer.attr('display', 'none');
};

ClockView.prototype.show = function() {
	this.hidden = false;
	this.svgContainer.attr('display', 'block');
};