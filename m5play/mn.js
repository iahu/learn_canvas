var canvas = document.getElementById('c'),
	ctx = canvas.getContext('2d');

var canvasS = document.getElementById('s'),
	ctxS = canvasS.getContext('2d');


canvas.width = 400;
canvas.height = 400;

ctx.fillStyle = '#000';
ctx.font = '100px '+'黑体, Arial, "Microsoft Yahei", sans-serif';
ctx.textBaseline = 'top';
ctx.fillText('text', 0, 0);
ctx.fill();

canvasS.width = 370;
canvasS.height = 370;
ctxS.fillStyle = '#0ff';

var pixelData = ctx.getImageData(0,0,370,370).data;
var h = [];

for (var i = 0; i < 370; i++) {
	h.push( h.slice.call(pixelData, i*370*4, i*370*4+370*4) );
}

function drawDot(x,y) {
	ctxS.beginPath();
	ctxS.arc(x,y,5, 0, 2*Math.PI);
	ctxS.closePath();
	ctxS.fill();
}

var r, idx;
for (var i = 0; i < h.length; i+=12) {
	r = h[i];
	for (var j = 0; j < r.length; j+=12) {
		idx = (i+5)*370*4 + (j+5)*4;

		if ( pixelData[ idx+3 ] === 255) {
			drawDot(j+5, i+5);
		}
	}
}