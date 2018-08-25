(function () {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 280;
    let mouse = {
        x: 0,
        y: 0
    };
    let last_mouse = {
        x: 0,
        y: 0
    };

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 20;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    canvas.addEventListener('mousedown', function (e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const onPaint = function () {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    };

}());