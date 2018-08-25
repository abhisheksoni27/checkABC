function OnMouseMoveListener(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}



let WIDTH_MULTIPLIER = 0.8;
let HEIGHT_MULTIPLIER = 0.6;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
    // not for mobile
    WIDTH_MULTIPLIER = 0.5;
    HEIGHT_MULTIPLIER = 0.6;
}
(function () {
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * WIDTH_MULTIPLIER;
    canvas.height = window.innerHeight * HEIGHT_MULTIPLIER;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let mouse = {
        x: 0,
        y: 0
    };
    let last_mouse = {
        x: 0,
        y: 0
    };

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', (e) => {
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