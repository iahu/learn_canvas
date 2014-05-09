var canvas = document.getElementById('m5play');

canvas.width = 1000;
canvas.height = 500;


function M5Play(canvas, text) {
	this.canvas = canvas;
	this._ctx = canvas.getContext('2d');
	this.text = text;
	this.xStep = 3;
	this.yStep = 3;
	this.cell = 12;
	this.gap = 2;
	this.stepValue = 0.2;
	this.points = [];
	this.pathShape = this.createPathShape(10, '#0ff');
	// this.clearFrame();
	this.init();
}

M5Play.prototype.init = function() {
	this.shapeCanvas = document.getElementById('shapeCanvas') || this.createShapeCanvas();
	this.clearFrame();
	this.drawText( this.text );

	var pd = this.getPathData();
	this.makePoints( pd );

	this.animate();
};

M5Play.prototype.drawText = function(text) {
	var shapeCanvas = this.shapeCanvas;
	var ctx = shapeCanvas.getContext('2d');
	var cell = this.cell;
	var d, textWidth, textHeight;
	
	this.text = text;
	this.textDepth = 255;
	this.textMaxHeight = 240;
	d = this.textDepth.toString(16);
	this.clearShapeCanvas();

	ctx.save();
	ctx.translate(500, 250);

	ctx.lineWidth = 1;
	ctx.fillStyle = '#'+d+d+d;
	ctx.font = this.textMaxHeight + 'px "宋体",serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';
	
	textWidth = ctx.measureText(this.text).width;
	this.textWidth = Math.ceil(textWidth/cell) * cell;

	textHeight = this.textMaxHeight;
	this.textHeight = Math.ceil(textHeight/cell) * cell;

	ctx.fillText(text, 0, -this.textMaxHeight/2);
	ctx.restore();
};

M5Play.prototype.getPathData = function() {
	var canvas = this.shapeCanvas;
	var ctx = canvas.getContext('2d');
	var cell = this.cell;
	var d = this.textDepth;

	var textWidth = this.textWidth;
	var textHeight = this.textHeight*1.5;
	var x = (canvas.width-textWidth)/2;
	var y = (canvas.height-textHeight)/2;
	var pixelData = ctx.getImageData(x,y, textWidth, textHeight).data;
	var pathObj = [];
	var h;
	var c = this._ctx;
	c.fillStyle = '#0ff';

	for (var i = 0, plen=pixelData.length; i < plen; i+=4) {
		h = Math.ceil((i+1)/(textWidth*4));
		if ( h%cell === 2 ) {
			i = i + textWidth*4*(cell-1);
			// h += cell-1; //目标行
			// i = (h-1)*textWidth*4;
		}
		// console.log(i);
		if ( pixelData[i] === d ) {
			var _x = ( i%(textWidth*4) )/4;
			pathObj.push( [_x+x, y+h] );
		}
	}
	pixelData = null;
	return pathObj;
};

M5Play.prototype.makePoints = function(pixelData) {
	var rc = this.randomColor;
	var random = this.random;
	var r = Math.floor((this.cell - this.gap)/2);
	var points = this.points;
	var p, point, c;
	
	this.clearFrame();

	for (var i = 0, len = pixelData.length; i < len; i+=3) {
		c = rc();
		p = pixelData[i];
		point = {
			x: p[0],
			y: p[1],
			radius: r,
			color: '0ff',
			_x: p[0] + random(-50, 50),
			_y: p[1] + random(-50, 50),
			vx: 5,
			vy: 5,
			ax: 0.1,
			ay: 0.1
		};
		points.push( point );
	}
};

M5Play.prototype.createPathShape = function(r, c) {
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	canvas.width = canvas.height = 2*r;
	ctx.translate(r,r);

	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.arc(0,0,r,0,2*Math.PI, true);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
	return  canvas;
};

M5Play.prototype.clearFrame = function() {
	var c = this.canvas;
	this._ctx.clearRect(0,0,c.width, c.height);
	// this.shapeCanvas.getContext('2d').clearRect(0,0,c.width, c.height);
};

M5Play.prototype.clearShapeCanvas = function() {
	var c = this.canvas;
	this.shapeCanvas.getContext('2d').clearRect(0,0,c.width, c.height);
};


M5Play.prototype.animate = function() {
	var me = this;
	var points = this.points;
	var ps = this.pathShape;
	var p;

	this.clearFrame();
	this._ctx.fillStyle = '#0ff';

	for (var i = 0, len = points.length; i < len; i++) {
		p = points[i];
		
		if (p._x <= p.x) {
			p._x += 1;
		} else {
			p._x -= 1;
		}

		if (p._y <= p.y) {
			p._y += 1;
		} else {
			p._y -= 1;
		}

		this._ctx.drawImage(ps,p.x, p.y, p.radius, p.radius);
		p = null;
	}

	ps = null;
	// setTimeout(function() {
		// me.animate();
	// }, 30);
};

M5Play.prototype.random = function(n,m) {
	return Math.floor( Math.random()*(m-n+1) + n );
};

M5Play.prototype.randomColor = function() {
	var r = function (n,m) {
		return Math.floor( Math.random()*(m-n+1) + n );
	};

	return 'rgba('+
		[r(0, 255), r(0, 255), r(0, 255), Math.random()].join(',') +
	')';
};

M5Play.prototype.fps = function() {
	var lastCalledTime, delta, fps;
	if(!lastCalledTime) {
		lastCalledTime = new Date().getTime();
		fps = 0;
		return;
	}
	delta = (new Date().getTime() - lastCalledTime)/800;
	lastCalledTime = new Date().getTime();
	fps = 1/delta;
	return fps;
};

M5Play.prototype.setText = function(text) {
	this.text = text;
	this.points = [];
	this.init();
};

M5Play.prototype.createShapeCanvas = function() {
	var c = document.createElement('canvas');
	
	c.id = 'shapeCanvas';
	c.style.zIndex = 0;
	// c.style.position = 'absolute';
	c.style.display = 'none';
	// c.style.visibility = 'hidden';
	c.width = this.canvas.width;
	c.height = this.canvas.height;

	document.body.appendChild(c);

	return c;
};