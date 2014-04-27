function canvasPainer(el) {
    // canvas element or element id
    var doc = document,
        canvas = typeof el === 'object'? el : document.getElementById(el),
        ctx = canvas.getContext('2d'),
        r = 6;

    ctx.lineWidth = 2*r;
    ctx.fillStyle = '#f0f';
    ctx.strokeStyle = '#f0f';

    canvas.addEventListener('mousedown', function(e) {
        handlerDraw(e);
        doc.addEventListener('mousemove', handlerDraw, false);
    }, false);

    canvas.addEventListener('mouseup', function (e) {
        ctx.beginPath();
        doc.removeEventListener('mousemove', handlerDraw, false);
    }, false);


    function handlerDraw(e) {
        var size = getSize(e);

        draw(ctx, size.x-8, size.y-8);
    }

    function draw(ctx, x, y) {

        ctx.lineTo(x, y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI, true);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function getSize(e) {
        return {
            x: e.pageX,
            y: e.pageY
        };
    }
}