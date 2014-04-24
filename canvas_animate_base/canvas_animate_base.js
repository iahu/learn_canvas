var canvas = document.getElementById('cvs');
var ctx = canvas.getContext('2d');
var x=100, y=100;
var tid;

canvas.width = 640;
canvas.height = 420;


function update() {
	// canvas.width = canvas.width;
	ctx.clearRect(0,0,640,420);

	ctx.fillStyle = 'red';
	ctx.fillRect(200, 100, 50, 50);
	ctx.strokeStyle ='black';
	ctx.strokeRect(200, 100, 50, 50);
	
	ctx.fillStyle = 'blue';
	ctx.fillRect(x, y, 50, 50);
	ctx.strokeStyle ='black';
	ctx.strokeRect(x, x, 50, 50);

	x += 2;
	y += 2;

	tid = setTimeout(update, 42);
	if (x >= 200) {
		clearTimeout(tid);
	}
}

update();