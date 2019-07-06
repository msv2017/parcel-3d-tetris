var getFigures = require('./figures');
var posx = 0;
var posy = 0;
var canvas = {};
var backImage = document.getElementById("wall-image");
var stop = false;
var fps = 30, fpsInterval, startTime, now, then, elapsed;
var wall = 0;

init();

var unitSize = canvas.w / 10;
var figures = getFigures(unitSize);

newFigure();

function drawImage(ctx, image) {
    ctx.drawImage(image, 0, 0, canvas.w, canvas.h);
}

function newFigure() {
    var arr = [figures.figureI, figures.figureL, figures.figureO, figures.figureT, figures.figureZ];
    figure = arr[Math.random() * arr.length | 0];
    figure.wall = wall;
    posy = 0;
    posx = wall * canvas.w;
    wall = (wall + 1) % 4;
}

function fitToContainer(canvas) {
    var c = document.getElementById('canvas-bottom');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = c.offsetWidth;
    canvas.height = c.offsetHeight;
}

function drawBackground() {
    drawImage(canvas.ctxBottom, backImage);
    drawImage(canvas.ctxUp, backImage);
    drawImage(canvas.ctxDown, backImage);
    drawImage(canvas.ctxLeft, backImage);
    drawImage(canvas.ctxRight, backImage);
}

function init() {
    canvas.bottom = document.getElementById('canvas-bottom');
    canvas.left = document.getElementById('canvas-left');
    canvas.right = document.getElementById('canvas-right');
    canvas.up = document.getElementById('canvas-up');
    canvas.down = document.getElementById('canvas-down');

    canvas.ctxBottom = canvas.bottom.getContext('2d');
    canvas.ctxLeft = canvas.left.getContext('2d');
    canvas.ctxRight = canvas.right.getContext('2d');
    canvas.ctxUp = canvas.up.getContext('2d');
    canvas.ctxDown = canvas.down.getContext('2d');

    fitToContainer(canvas.bottom);
    fitToContainer(canvas.left);
    fitToContainer(canvas.right);
    fitToContainer(canvas.up);
    fitToContainer(canvas.down);

    canvas.w = canvas.bottom.offsetWidth;
    canvas.h = canvas.bottom.offsetHeight;

    canvas.bottomBuffer = document.getElementById('canvas-bottom-buffer');
    canvas.ctxBottomBuffer = canvas.bottomBuffer.getContext('2d');
    canvas.bottomBuffer.style.width = '100%';
    canvas.bottomBuffer.style.height = '100%';
    canvas.bottomBuffer.width = canvas.w;
    canvas.bottomBuffer.height = canvas.h;

    canvas.buffer = document.getElementById('canvas-buffer');
    canvas.ctxBuffer = canvas.buffer.getContext('2d');
    canvas.buffer.style.width = '100%';
    canvas.buffer.style.height = '100%';
    canvas.buffer.width = canvas.w * 4;
    canvas.buffer.height = canvas.h * 2;

    canvas.final = document.getElementById('canvas-final');
    canvas.ctxFinal = canvas.final.getContext('2d');
    canvas.final.style.width = '100%';
    canvas.final.style.height = '100%';
    canvas.final.width = canvas.w * 4;
    canvas.final.height = canvas.h * 2;

    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();

    document.addEventListener('keydown', keyDown);
}

function keyDown(e) {
    if (e.code === 'Space') {
        stop = !stop;
        return;
    }

    var sx = 0, sy = 0;

    if (e.code === 'KeyA') {
        sx -= unitSize;
    }

    if (e.code === 'KeyD') {
        sx += unitSize;
    }

    if (e.code === 'KeyS') {
    }

    var xmin = figure.wall * canvas.w;
    var xmax = xmin + canvas.w - figure.bbox.width;
    var x = posx + sx;

    if (x >= xmin && x <= xmax) {
        posx = x;
    }
}

function animate(ts) {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;

    if (!stop && elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        drawBackground();
        clearBuffer();

        figure.draw(canvas.ctxBuffer, posx, posy);

        if (posy + figure.bbox.height + 1 <= canvas.buffer.height) {
            posy++;
        } else {
            figure.draw(canvas.ctxFinal, posx, posy);
            newFigure();
        }

        drawBuffer();
    }
}

function clearBuffer() {
    var ctx = canvas.buffer.getContext('2d');
    ctx.clearRect(0, 0, canvas.buffer.width, canvas.buffer.height);
}

function drawOnBottom(image, sx, angle) {
    var w = canvas.w;
    var h = canvas.h;
    canvas.ctxBottomBuffer.save();
    canvas.ctxBottomBuffer.translate(w / 2, h / 2);
    canvas.ctxBottomBuffer.rotate(angle);
    canvas.ctxBottomBuffer.drawImage(image, sx, h, w, h, -w / 2, -h / 2, w, h);
    canvas.ctxBottom.drawImage(canvas.bottomBuffer, 0, 0, w, h);
    canvas.ctxBottomBuffer.restore();
    canvas.ctxBottomBuffer.clearRect(0, 0, w, h);
}

function drawBuffer() {
    var w = canvas.w;
    var h = canvas.h;

    drawOnBottom(canvas.buffer, w, Math.PI / 2);
    drawOnBottom(canvas.buffer, 2 * w, Math.PI);
    drawOnBottom(canvas.buffer, 3 * w, -Math.PI / 2);

    canvas.ctxBottom.drawImage(canvas.buffer, 0, h, w, h, 0, 0, w, h);
    canvas.ctxUp.drawImage(canvas.buffer, 0, 0, w, h, 0, 0, w, h);
    canvas.ctxRight.drawImage(canvas.buffer, w, 0, w, h, 0, 0, w, h);
    canvas.ctxDown.drawImage(canvas.buffer, 2 * w, 0, w, h, 0, 0, w, h);
    canvas.ctxLeft.drawImage(canvas.buffer, 3 * w, 0, w, h, 0, 0, w, h);

    drawOnBottom(canvas.final, w, Math.PI / 2);
    drawOnBottom(canvas.final, 2 * w, Math.PI);
    drawOnBottom(canvas.final, 3 * w, -Math.PI / 2);

    canvas.ctxBottom.drawImage(canvas.final, 0, h, w, h, 0, 0, w, h);
    canvas.ctxUp.drawImage(canvas.final, 0, 0, w, h, 0, 0, w, h);
    canvas.ctxRight.drawImage(canvas.final, w, 0, w, h, 0, 0, w, h);
    canvas.ctxDown.drawImage(canvas.final, 2 * w, 0, w, h, 0, 0, w, h);
    canvas.ctxLeft.drawImage(canvas.final, 3 * w, 0, w, h, 0, 0, w, h);
}
