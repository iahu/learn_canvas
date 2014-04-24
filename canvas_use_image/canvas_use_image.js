var canvas,
ctx2d,
img;

canvas = document.getElementById('cvs');
ctx2d = canvas.getContext('2d');

img = new Image();

img.onload = function (e) {
	var et = e.target;
	// ctx2d.drawImage(img,30,40);
	ctx2d.drawImage(img,110,150, 220, 230, 60, 40, 220, 230);
};

img.src = 'test.jpg';
