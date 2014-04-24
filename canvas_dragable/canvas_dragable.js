function Circle(ctx) {
	this.ctx = ctx;
	if (!ctx) {return null;}

	this.speed = 1000/40;
}

Circle.prototype.draw = function(x,y,r,c) {
	this.x = x || this.x || 0;
	this.y = y || this.y || 0;
	this.r = r || this.r || 0;
	this.c = c || this.c || '#f60';

	var ctx = this.ctx;

	if (ctx) {
		ctx.fillStyle = this.c;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
		ctx.fill();
		ctx.closePath();

		return this;
	}
	return false;
};

Circle.prototype.pos = function(x, y) {
	if (x && y) {
		this.x = x;
		this.y = y;
		return this;
	} else {
		return {
			x: this.x,
			y: this.y
		};
	}
};

Circle.prototype.clearCanvas = function () {
	var c = this.ctx.canvas;
	this.ctx.clearRect(0, 0, c.width, c.height );
};

Circle.prototype.move = function (x, y) {
	var me = this,
		oX = x -this.x,
		oY = y - this.y,
		s = Math.sqrt( oX*oX + oY*oY ),
		sX = oX/s,
		sY = oY/s;

	(function update() {
		var t = setTimeout(update, me.speed);

		me.x += sX;
		me.y += sY;

		var check = x*x+y*y <= me.x*me.x + me.y*me.y;

		if ( check ) {
			me.x = x;
			me.y = y;
			clearTimeout(t);
		}

		me.clearCanvas();
		me.pos(me.x, me.y);
		me.draw();
	}());
};

Circle.prototype.dragable = function() {
	var me = this,
		canvas = this.ctx.canvas;

	function handleMove(e) {
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;

		me.pos(x, y);
		me.clearCanvas();
		me.draw();
	}

	canvas.addEventListener('mousedown', function() {
		canvas.addEventListener('mousemove', handleMove);
	});

	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', handleMove);
	});
};