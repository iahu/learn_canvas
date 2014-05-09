var Ball = function () {
	this.x = 0;
	this.y = 0;
	this.r = 10;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.friction = 0.02;
	this.bounce = -0.03;
	this.lineWidth = 0;
	this.fillStyle = '#'+ (parseInt(Math.random() * 0xffffff)).toString(16);
	this.strokeStyle = '#000';
};

Ball.prototype.draw = function(ctx) {
	ctx.save();

	ctx.beginPath();
	ctx.fillStyle = this.fillStyle;
	ctx.strokeStyle = this.strokeStyle;
	ctx.lineWidth = this.lineWidth;
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
	ctx.closePath();

	ctx.fill();
	if ( this.lineWidth > 0 ) {
		ctx.stroke();
	}

	ctx.restore();
};