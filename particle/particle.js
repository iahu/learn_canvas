var c = document.getElementById('c'),
	ctx = c.getContext('2d'),
	particles = [];

ctx.translate(400,300);
// ctx.fillStyle = '#0ff';

function random(m,n) {
	return Math.random()*(n-m)+m;
}

function Part() {
	this.x = 0; // random(-1,1);
	this.y = 0; // random(-1,1);
	this.a = 1;
	this.r = 8;
	this.vx = random(-2,2);
	this.vy = random(-2,2);
	this.ax = 0.05;
	this.ay = 0.05;

	if (this.vx < 0) {
		this.ax *= -1;
	}

	if (this.vy < 0) {
		this.ay *= -1;
	}
}

Part.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'rgba(255,10,0,'+ this.a.toFixed(2) + ')';
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
};


function drawFrame() {
	window.requestAnimationFrame(drawFrame);
	
	var particle = new Part();
	var p;

	particles.push(particle);

	if (particles.length === 50) {
		particles.shift();
	}
	
	ctx.clearRect(-400,-300, 800, 600);

	for (var i = 0, len = particles.length; i < len; i++) {
		p = particles[i];
		// p.r = 5 - 4 * i/30;
		p.a = i/30;

		p.vx += p.ax;
		p.vy += p.ay;
		p.x += p.vx;
		p.y += p.vy;

		p.draw(ctx);
	}
}
drawFrame();