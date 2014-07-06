var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var tempCvs = document.createElement('canvas');
var tempCtx = tempCvs.getContext('2d');
var img = document.getElementById('img');
var w = 10,
    h = 10;
var WIDTH, HEIGHT, imageData;
var rgba = function(cur) {
    return 'rgba(' + [imageData[cur], imageData[cur + 1], imageData[cur + 2], imageData[cur + 3] / 255].join(',') + ')';
};

var pixelImage = function() {
    tempCtx.drawImage(img, 0, 0, WIDTH, HEIGHT);
    imageData = tempCtx.getImageData(0, 0, WIDTH, HEIGHT).data;
    var xLen = Math.ceil(WIDTH / w),
        yLen = Math.ceil(HEIGHT / h),
        x = 0,
        y = 0,
        PI = Math.PI,
        cur,
        r, g, b, a;
    for (var i = 0; i < xLen; i++) {
        for (var j = 0; j < yLen; j++) {
            x = i * w + w / 2;
            y = j * h + h / 2;
            cur = y * WIDTH * 4 + x * 4;
            ctx.beginPath();
            ctx.fillStyle = rgba(cur);
            ctx.arc(x, y, w / 2, 0, 2 * PI);
            // ctx.fillRect(x, y, w, h);
            ctx.fill();
            ctx.closePath();
        };
    };


    // ctx.putImageData(imageData, 0, 0);
};
var setCtx = function() {
    WIDTH = img.width;
    HEIGHT = img.height;
    cvs.width = tempCvs.width = WIDTH;
    cvs.height = tempCvs.height = HEIGHT;
};
var init = function() {
    setCtx();
    pixelImage();
};

if (img.width) {
    init();
} else {
    img.onload = init;
}