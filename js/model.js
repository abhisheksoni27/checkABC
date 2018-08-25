const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

let model;
/**
 * Loads the TF model
 * returns a Promise that resolves into a {model} instance
 */
function loadModel() {
    return tf.loadModel('../model/model.json');
}


// Immediately load the model!
loadModel().then((res) => {
    model = res;
});

// Because that's the size of the images
// we trained our model on
const finalWidth = 28;
const finalHeight = 28;


// Result will be displayed here
const result = document.querySelector('.result');

// Another canvas used to resize the original one!
// Notice how this is created on the fly, not referenced
const resizeCanvas = document.createElement("canvas"),
    resizeCtx = resizeCanvas.getContext("2d");

resizeCanvas.width = finalWidth;
resizeCanvas.height = finalHeight;

// And this is the final container 
// that contains the raw Pixel Data

// Shape? 28x28
const pixels = new Array(784);

for (let i = 0; i < 784; i++) {
    pixels[i] = 0;
}

/**
 * Resizes an image to the desired size using a resize Canvas
 */
function resize(dstWidth, dstHeight) {
    // First clear the canvas, just in case
    resizeCtx.clearRect(0, 0, resizeCanvas.width, resizeCanvas.height)
    resizeCtx.drawImage(canvas, 0, 0, dstWidth, dstHeight);
}

function infer() {
    loadModel().then((res) => {
        model = res;
        tf.tidy(() => {
            const imageTensor = tf.tensor(pixels).reshape([-1, 28, 28, 1]);
            const output = model.predict(imageTensor);

            const axis = 1;
            const predictions = Array.from(output.argMax(axis).dataSync());
            const answer = String.fromCharCode(64 + predictions[0]);
            result.innerHTML = `You drew ${answer}.`
        });
    });
}

/**
 * Function called when Check is pressed.
 */

export default function check() {
    resize(finalWidth, finalHeight);

    // Get raw pixel data
    const dataSrc = resizeCtx.getImageData(0, 0, finalWidth, finalHeight).data;

    const len = dataSrc.length;
    let luma;

    // convert by iterating over each pixel each representing RGBA
    for (let i = 0; i < len; i += 4) {
        // Need to check why this works, but for now it does, so yeah!
        luma = dataSrc[i + 3]
        pixels[i / 4] = (luma) / 255;

    }

    // At the end, infer!
    infer();
}