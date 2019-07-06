const unitSize = 20;

function drawFigureT(ctx, x, y) {
    ctx.fillStyle = 'magenta';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 3 * unitSize, y);
    ctx.lineTo(x + 3 * unitSize, y + unitSize);
    ctx.lineTo(x + 2 * unitSize, y + unitSize);
    ctx.lineTo(x + 2 * unitSize, y + 2 * unitSize);
    ctx.lineTo(x + unitSize, y + 2 * unitSize);
    ctx.lineTo(x + unitSize, y + unitSize);
    ctx.lineTo(x, y + unitSize);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFigureL(ctx, x, y) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + unitSize, y);
    ctx.lineTo(x + unitSize, y + 2 * unitSize);
    ctx.lineTo(x + 2 * unitSize, y + 2 * unitSize);
    ctx.lineTo(x + 2 * unitSize, y + 3 * unitSize);
    ctx.lineTo(x, y + 3 * unitSize);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFigureI(ctx, x, y) {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + unitSize, y);
    ctx.lineTo(x + unitSize, y + 4 * unitSize);
    ctx.lineTo(x, y + 4 * unitSize);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFigureO(ctx, x, y) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 2 * unitSize, y);
    ctx.lineTo(x + 2 * unitSize, y + 2 * unitSize);
    ctx.lineTo(x, y + 2 * unitSize);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFigureZ(ctx, x, y) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(x + unitSize, y);
    ctx.lineTo(x + 3 * unitSize, y);
    ctx.lineTo(x + 3 * unitSize, y + unitSize);
    ctx.lineTo(x + 2 * unitSize, y + unitSize);
    ctx.lineTo(x + 2 * unitSize, y + 2 * unitSize);
    ctx.lineTo(x, y + 2 * unitSize);
    ctx.lineTo(x, y + unitSize);
    ctx.lineTo(x + unitSize, y + unitSize);
    ctx.fill();
}

module.exports = function (unitSize) {
    this.unitSize = unitSize;
    
    return {
        figureT: {
            draw: drawFigureT,
            bbox: { width: 3 * unitSize, height: 2 * unitSize }
        },
        figureL: {
            draw: drawFigureL,
            bbox: { width: 2 * unitSize, height: 3 * unitSize }
        },
        figureI: {
            draw: drawFigureI,
            bbox: { width: 1 * unitSize, height: 4 * unitSize }
        },
        figureZ: {
            draw: drawFigureZ,
            bbox: { width: 3 * unitSize, height: 2 * unitSize }
        },
        figureO: {
            draw: drawFigureO,
            bbox: { width: 2 * unitSize, height: 2 * unitSize }
        }
    };
};