import {
    MDCRipple
} from '@material/ripple';

new MDCRipple(document.querySelector('.button'));
let WIDTH_MULTIPLIER = 0.8;
let HEIGHT_MULTIPLIER = 0.6;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!isMobile) {
    // not for mobile
    WIDTH_MULTIPLIER = 0.5;
    HEIGHT_MULTIPLIER = 0.6;
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    let mousePos;

    if (isMobile) {
        mousePos = {
            x: evt.touches[0].clientX - rect.left,
            y: evt.touches[0].clientY - rect.top
        }
    } else {
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    }
    return mousePos;
}

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const result = document.querySelector('.result');

canvas.width = window.innerWidth * WIDTH_MULTIPLIER;
canvas.height = window.innerHeight * HEIGHT_MULTIPLIER;

ctx.lineWidth = 20;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    result.innerHTML = `Go on! Draw Something.`
}

let mouse = {
    x: NaN,
    y: NaN
};

let last_mouse = {
    x: NaN,
    y: NaN
};

const OnStartListener = function (e) {
    if (isMobile) {
        canvas.addEventListener('touchmove', onPaint, false)
    } else {
        canvas.addEventListener('mousemove', onPaint, false);
    }
};

const OnMoveListener = (e) => {
    e.preventDefault();
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    mouse = getMousePos(canvas, e);
    return false;
};

const OnEndListener = function () {
    if (isMobile) {
        canvas.removeEventListener('touchmove', onPaint, false)
        // Reset!
        mouse = {
            x: NaN,
            y: NaN
        };

        last_mouse = {
            x: NaN,
            y: NaN
        };
    } else {
        canvas.removeEventListener('mousemove', onPaint, false);
    }

};

const onPaint = function () {
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
};

// Clear

clearCanvas();

export function draw() {

    if (isMobile) {
        canvas.addEventListener('touchstart', OnStartListener, false)
        canvas.addEventListener('touchmove', OnMoveListener, false)
        canvas.addEventListener('touchend', OnEndListener, false)
    } else {
        /* Mouse Capturing Work */
        canvas.addEventListener('mousedown', OnStartListener, false);
        canvas.addEventListener('mousemove', OnMoveListener, false);
        canvas.addEventListener('mouseup', OnEndListener, false);
    }
}