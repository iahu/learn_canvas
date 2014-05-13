var Character = function(canvas) {
	this.init.call(this, canvas);
};

Character.prototype.init = function(canvas) {
	this.ctx = canvas.getContext('2d');
	this.cell = 5;
	this.width = canvas.width;
	this.height = canvas.height;

	this.createShapeCanvas(this.width, this.height);
};

Character.prototype.createShapeCanvas = function(w,h) {
	var c = document.createElement('canvas');

	c.width = w;
	c.height = h;
	this.shapeCanvas = c;
};

Character.prototype.drawText = function(text) {
	var c = this.shapeCanvas,
		ctx =  c.getContext('2d'),
		cell = this.cell,
		w, h;

	ctx.clearRect(0,0, c.width, c.height);

	ctx.fillStyle = '#000';
	ctx.font = '100px 微软雅黑, san-serif';
	ctx.textBaseline = 'top';

	ctx.fillText(text, 0, 0);

	w = Math.ceil(c.width/cell)*cell;
	h = Math.ceil(c.height/cell)*cell;
	return ctx.getImageData(0,0, w,h).data;
};

Character.prototype.shape = (function() {
	var random = _random = function(m,n) {
		return Math.random()*(n-m)+m;
	};

	var Ball = function () {
		this.x = 0;
		this.y = 0;
		this.r = 2;
		this.vx = random(-0.05,0.05);
		this.vy = random(0.96,0.98);
		this.ax = random(-0.1,0.1);
		this.ay = random(0.7,0.8);
		this.friction = 0.02;
		this.bounce = -0.6;
		this.lineWidth = 0;
		// this.fillStyle = '#'+ (parseInt(Math.random() * 0xffffff)).toString(16);
		this.fillStyle = '#000';
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

	return {
		Ball: Ball
	};
}());

Character.prototype.build = function(imageData) {
	var ctx = this.ctx,
		w = this.width,
		h = this.height,
		imageData = imageData,
		Ball = this.shape.Ball,
		ball = null,
		balls = [],
		cell = this.cell,
		_w = Math.floor(w/cell)*cell*4,
		h = _w-4*cell,
		_h = 0,
		_x,
		_y;
	for (var i = 0; i < imageData.length; i+=4*cell) {
		_x = i%(_w)/4;
		_y = Math.floor(i/_w);

		if ( imageData[i+3] === 255 ) {
			ball = new Ball();
			ball.x = _x+4;
			ball.y = _y+4;
			ball.draw(ctx);
			balls.push(ball);
		}

		if ( i%_w === h ) {
			_h += cell;
			i = _w*(_h-1) + h;
		}
	}

	this.balls = balls;
};

Character.prototype.animate = function() {
	var me = this;
	var balls = this.balls;
	var ctx = this.ctx;
	var w = this.width;
	var h = this.height;
	var ball;

	(function drawFrame() {
		var i = 0,
			len = balls.length;

		ctx.clearRect(0,0,w,h);
		if (len) {
			requestAnimationFrame(drawFrame);
		}

		for (;i < len; i++) {
			ball = balls[i];
			if (ball) {
				ball.vx += ball.ax;
				ball.x += ball.vx;
				ball.vy += ball.ay;
				ball.y += ball.vy;

				if (ball.y+ball.r + ball.vy > h) {
					ball.vy *= ball.bounce;
					ball.vx *= ball.bounce;
				}
				
				if (ball.y+ball.r > h) {
					balls[i] = balls[ balls.length-1 ];
					balls.pop();
				}

				ball.draw(ctx);
				ball = null;
			}
		}
		i = null;
		len = null;
	}());
};