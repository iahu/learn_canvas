function Shape(ctx) {
	this.ctx = ctx;
	this.fillStyle = '#fff';
	this.strokeStyle = '#000';
}

var p = Shape.prototype;

p.draw = function(type) {
	if (this[type]) {
		return this[type].apply(this, Array.prototype.slice.call(arguments, 1) );
	}
	return this;
};

p.begainFill = function(s) {
	var fs = s || this.fillStyle;
	this.ctx.fillStyle = fs;
	return this;
};

p.begainStroke = function(s) {
	var ss = this.strokeStyle = s || this.strokeStyle;
	this.ctx.strokeStyle = ss;
	return this;
};

p.endFill = function() {
	this.ctx.fill();

	return this;
};

p.endStroke = function() {
	this.ctx.stroke();

	return this;
};

p.rect = function(x,y,w,h) {
	var ctx = this.ctx;
	
	ctx.strokeStyle = this.strokeStyle;
	ctx.rect(x,y,w,h);

	return this;
};

p.arc = function(x,y,r,s,e,f) {
	var ctx = this.ctx;
	
	ctx.beginPath();
	ctx.arc(x,y,r,s,e,f || true);
	ctx.closePath();
	ctx.stroke();

	return this;
};

p.circle = function(x,y,r) {
	this.arc(x,y,r, 0, 2*Math.PI, true);

	return this;
};