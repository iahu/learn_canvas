var canvas = document.getElementById('cvs'),
	ctx2d = canvas.getContext('2d'),

	cvsW = canvas.width,
	cvsH = canvas.height,
	
	colW = 30,
	colNum = ((cvsW-0.5) / colW) >>> 0,
	lineW = colW * colNum,
	rowH = 30,
	rowNum = ((cvsH-0.5) / rowH) >>> 0,
	lineH = rowH * rowNum;


ctx2d.strokeStyle = '#ccc';

// 画坐标
while( true ) {
	ctx2d.beginPath();
	ctx2d.moveTo( colNum * colW + 0.5, 0 );
	ctx2d.lineTo( colNum * colW + 0.5, lineH );
	ctx2d.closePath();
	ctx2d.stroke();
	ctx2d.fill();
	colNum -= 1;
	if (colNum < 0) {break;}
}
while( true ) {
	ctx2d.beginPath();
	ctx2d.moveTo( 0, rowNum * rowH + 0.5 );
	ctx2d.lineTo( lineW, rowNum * rowH + 0.5 );
	ctx2d.closePath();
	ctx2d.stroke();
	ctx2d.fill();
	rowNum -= 1;
	if (rowNum < 0) {break;}
}

// 画矩形
ctx2d.fillStyle = '#f6c';
ctx2d.fillRect(colW*5 , rowH*5 , colW * 2, rowH * 2);
ctx2d.strokeRect(colW*3.5, rowH*3.5, colW*2, rowH*2);


// 画弧
ctx2d.beginPath();
ctx2d.arc(340,125,50,0,Math.PI*2,true);
ctx2d.stroke();
ctx2d.fill();
ctx2d.closePath();

// 二次方曲线
ctx2d.beginPath();
ctx2d.moveTo(187, 50);
ctx2d.quadraticCurveTo(130,30,53,76);
ctx2d.quadraticCurveTo(123,234,153,65);
ctx2d.stroke();
ctx2d.closePath();

// 贝塞尔曲线
ctx2d.beginPath();
ctx2d.moveTo(75,40);
ctx2d.bezierCurveTo(75,37,70,25,50,25);
ctx2d.bezierCurveTo(20,25,20,62.5,20,62.5);
ctx2d.bezierCurveTo(20,80,40,102,75,120);
ctx2d.bezierCurveTo(110,102,130,80,130,62.5);
ctx2d.bezierCurveTo(130,62.5,130,25,100,25);
ctx2d.bezierCurveTo(85,25,75,37,75,40);
ctx2d.fill();