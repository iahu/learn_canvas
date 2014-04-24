var canvas = document.getElementById('cvs'),
	ctx = canvas.getContext('2d');

ctx.translate(250, 150);
ctx.fillStyle = '#f90';
ctx.arc(0,0,100, 0, 2*Math.PI, true);
ctx.fill();

var $log = document.getElementById('log');

function getEventPosition(ev){  
  var x, y;  
  if (ev.layerX || ev.layerX === 0) {  
    x = ev.layerX;  
    y = ev.layerY;  
  } else if (ev.offsetX || ev.offsetX === 0) { // Opera  
    x = ev.offsetX;  
    y = ev.offsetY;  
  }  
  return {x: x, y: y};  
} 

canvas.addEventListener('click', function(e) {
	var pos = getEventPosition(e);

	if ( ctx.isPointInPath(pos.x, pos.y) ) {
		alert('click');
	}

	$log.innerHTML = ['x:', pos.x, ', y:', pos.y].join('');
});