var canvas = document.getElementById('cvs'),
	ctx2d = canvas.getContext('2d');

ctx2d.fillRect(0,0,150,150);
ctx2d.translate(75,75);

ctx2d.beginPath();
ctx2d.arc(0,0,60,0, Math.PI*2, true);
ctx2d.clip();

var lingrad = ctx2d.createLinearGradient(0,-75,0,75);
lingrad.addColorStop(0, '#232256');
lingrad.addColorStop(1, '#143778');

ctx2d.fillStyle = lingrad;
ctx2d.fillRect(-75, -75, 150, 150);

for (var j = 1; j < 50; j++) {
	ctx2d.save();
	ctx2d.fillStyle = '#fff';
	ctx2d.translate(75-Math.floor(Math.random() *150),
		75-Math.floor(Math.random()*150));
	drawStar(ctx2d, Math.floor(Math.random()*4)+2);
	ctx2d.restore();
}
function drawStar(ctx2d,r){
  ctx2d.save();
  ctx2d.beginPath();
  ctx2d.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx2d.rotate(Math.PI/5);
    if(i%2 === 0) {
      ctx2d.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx2d.lineTo(r,0);
    }
  }
  ctx2d.closePath();
  ctx2d.fill();
  ctx2d.restore();
}
