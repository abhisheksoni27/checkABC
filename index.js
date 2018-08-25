let model;

function loadModel() {
    return tf.loadModel('model/model.json');
}

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const log = console.log;
const finalWidth = 28;
const finalHeight = 28;
const resizeCanvas = document.createElement("canvas"),
    resizeCtx = resizeCanvas.getContext("2d");
resizeCanvas.width = finalWidth;
resizeCanvas.height = finalHeight;

const pixels = new Array(28).fill(0)

for (let index = 0; index < pixels.length; index++) {
    pixels[index] = new Array(28).fill(0);
}

function resize() {
    resizeCtx.drawImage(canvas, 0, 0, finalWidth, finalHeight);
    letterImage.src = resizeCanvas.toDataURL()
}

function generate() {
    resize();

    const dataSrc = resizeCtx.getImageData(0, 0, finalWidth, finalHeight).data;

    const len = dataSrc.length;
    let luma;

    let j = 0,
        k = 0;
    // convert by iterating over each pixel each representing RGBA
    for (let i = 0; i < len; i += 4) {
        // calculate luma, here using Rec 709
        luma = dataSrc[i + 3];
        pixels[j][k] = (luma) / 255;
        k++;
        if (k > 27) {
            k = 0;
            j++;
        }
    }
    infer();
}

function infer() {
    loadModel().then((res) => {
        model = res;
        tf.tidy(() => {
            const imageTensor = tf.tensor(pixels).reshape([-1, 28, 28, 1]);
            const output = model.predict(imageTensor);

            const axis = 1;
            const predictions = Array.from(output.argMax(axis).dataSync());

            log(String.fromCharCode(64 + predictions[0]));
        });
    });
}