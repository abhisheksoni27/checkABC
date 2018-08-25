import check from './model'
import {
    draw,
    clearCanvas
} from './drawing'

draw();

document.querySelector('.checkButton').onclick = check
document.querySelector('.clearButton').onclick = clearCanvas

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log("Service Worker Registered");
        });
}

// new MDCRipple(document.querySelector('.button'));

// let WIDTH_MULTIPLIER = 0.8;
// let HEIGHT_MULTIPLIER = 0.6;

// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (!isMobile) {
//     // not for mobile
//     WIDTH_MULTIPLIER = 0.5;
//     HEIGHT_MULTIPLIER = 0.6;
// }

// function getMousePos(canvas, evt) {
//     const rect = canvas.getBoundingClientRect();
//     let mousePos;

//     if (isMobile) {
//         mousePos = {
//             x: evt.touches[0].clientX - rect.left,
//             y: evt.touches[0].clientY - rect.top
//         }
//     } else {
//         mousePos = {
//             x: evt.clientX - rect.left,
//             y: evt.clientY - rect.top
//         }
//     }
//     return mousePos;
// }

// const canvas = document.getElementsByTagName('canvas')[0];
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth * WIDTH_MULTIPLIER;
// canvas.height = window.innerHeight * HEIGHT_MULTIPLIER;

// ctx.lineWidth = 20;
// ctx.lineJoin = 'round';
// ctx.lineCap = 'round';
// ctx.strokeStyle = 'black';


// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// // Clear
// clearCanvas();

// let mouse = {
//     x: NaN,
//     y: NaN
// };

// let last_mouse = {
//     x: NaN,
//     y: NaN
// };

// const OnStartListener = function (e) {
//     if (isMobile) {
//         canvas.addEventListener('touchmove', onPaint, false)
//     } else {
//         canvas.addEventListener('mousemove', onPaint, false);
//     }
// };

// const OnMoveListener = (e) => {
//     e.preventDefault();
//     last_mouse.x = mouse.x;
//     last_mouse.y = mouse.y;
//     mouse = getMousePos(canvas, e);
//     return false;
// };

// const OnEndListener = function () {
//     if (isMobile) {
//         canvas.removeEventListener('touchmove', onPaint, false)
//         // Reset!
//         mouse = {
//             x: NaN,
//             y: NaN
//         };

//         last_mouse = {
//             x: NaN,
//             y: NaN
//         };
//     } else {
//         canvas.removeEventListener('mousemove', onPaint, false);
//     }

// };

// const onPaint = function () {
//     ctx.beginPath();
//     ctx.moveTo(last_mouse.x, last_mouse.y);
//     ctx.lineTo(mouse.x, mouse.y);
//     ctx.closePath();
//     ctx.stroke();
// };

// if (isMobile) {
//     canvas.addEventListener('touchstart', OnStartListener, false)
//     canvas.addEventListener('touchmove', OnMoveListener, false)
//     canvas.addEventListener('touchend', OnEndListener, false)
// } else {
//     /* Mouse Capturing Work */
//     canvas.addEventListener('mousedown', OnStartListener, false);
//     canvas.addEventListener('mousemove', OnMoveListener, false);
//     canvas.addEventListener('mouseup', OnEndListener, false);
// }


// let model;

// /**
//  * Loads the TF model
//  * returns a Promise that resolves into a {model} instance
//  */
// function loadModel() {
//     return tf.loadModel('model/model.json');
// }

// // Immediately load the model!
// loadModel().then((res) => {
//     model = res;
// });

// // Because that's the size of the images
// // we trained our model on
// const finalWidth = 28;
// const finalHeight = 28;

// // Result will be displayed here
// const result = document.querySelector('.result');

// // Another canvas used to resize the original one!
// // Notice how this is created on the fly, not referenced
// const resizeCanvas = document.createElement("canvas"),
//     resizeCtx = resizeCanvas.getContext("2d");

// resizeCanvas.width = finalWidth;
// resizeCanvas.height = finalHeight;

// // And this is the final container 
// // that contains the raw Pixel Data

// // Shape? 28x28
// const pixels = new Array(784);

// for (let i = 0; i < 784; i++) {
//     pixels[i] = 0;
// }

// /**
//  * Resizes an image to the desired size using a resize Canvas
//  */
// function resize(dstWidth, dstHeight) {
//     // First clear the canvas, just in case
//     resizeCtx.clearRect(0, 0, resizeCanvas.width, resizeCanvas.height)
//     resizeCtx.drawImage(canvas, 0, 0, dstWidth, dstHeight);
// }

// /**
//  * Function called when Check is pressed.
//  */
// function checkImage() {
//     resize(finalWidth, finalHeight);

//     // Get raw pixel data
//     const dataSrc = resizeCtx.getImageData(0, 0, finalWidth, finalHeight).data;

//     const len = dataSrc.length;
//     let luma;

//     let j = 0,
//         k = 0;

//     // convert by iterating over each pixel each representing RGBA
//     for (let i = 0; i < len; i += 4) {
//         // Need to check why this works, but for now it does, so yeah!
//         luma = dataSrc[i + 3]
//         pixels[i / 4] = (luma) / 255;

//     }

//     // At the end, infer!
//     infer();
// }

// function infer() {
//     loadModel().then((res) => {
//         model = res;
//         tf.tidy(() => {
//             const imageTensor = tf.tensor(pixels).reshape([-1, 28, 28, 1]);
//             const output = model.predict(imageTensor);

//             const axis = 1;
//             const predictions = Array.from(output.argMax(axis).dataSync());
//             const answer = String.fromCharCode(64 + predictions[0]);
//             result.innerHTML = `You drew ${answer}.`
//         });
//     });
// }