var cvs = document.getElementById('cvs'),
	ctx2d = cvs.getContext('2d');

for (var i = 0; i < 6; i++) {
	for (var j = 0; j < 6; j++) {
		ctx2d.fillStyle = 'rgb('+Math.floor(255-42.5*i)+ ','+
						Math.floor(255-24.5*j) + ',0)';
		
		ctx2d.strokeStyle = 'rgb(' + Math.floor(255-42.5*i) + ',0' + 
                        Math.floor(255-42.5*j) + ')';
		
		ctx2d.fillRect(j*25,i*25,25,25);

		ctx2d.beginPath();
		ctx2d.arc(12.5+j*25, 12.5+i*25,10,0,Math.PI*2, true);
		ctx2d.stroke();
		// ctx2d.closePath();
	}
}