import { DEFAULT_CONFIG } from "./consts.js";
import { Point } from "./point.js";
import { Line } from "./line.js";
import { getElement, merge } from "./utils.js";
import * as T from "./types.js";


/**
 * @param {T.Config} option 
 */
const Drawer = function (option) {
    /** @type {T.Config} */
    this.config = merge(DEFAULT_CONFIG, option);
    this.shapes = [];
    this._init();
};

Drawer.prototype._init = function () {
    this._validateAndStandalizeCanvasElement();
    this._drawGrid();
}

Drawer.prototype._validateAndStandalizeCanvasElement = function () {
    if (!this._isValidCanvasElement()) {
        throw new Error("Invalid canvas element!");
    } 
    if (!this._isStandalizedCanvasElement()) {
        this._standalizeCanvasElement();
    }
    if (!this._isStandalizedCanvasElement()) {
        throw new Error("Cannot standalize canvas element!");
    }
    if (this._isCanvasElementHasParent()) {
        this._inheriteSizeParentElement();
        if (this._hasPadding()) {
            this._centerCanvasElementInParentElement();
        }
    } else {
        throw new Error("Canvas must have parent element!");
    }
}

Drawer.prototype._isValidCanvasElement = function () {
    return typeof this.config.canvasElement == 'string' || this._isStandalizedCanvasElement();
}

Drawer.prototype._isStandalizedCanvasElement = function () {
    return this.config.canvasElement instanceof HTMLCanvasElement;
}

Drawer.prototype._isCanvasElementHasParent = function () {
    return !!this.config.canvasElement.parentElement
}

Drawer.prototype._standalizeCanvasElement = function () {
    this.config.canvasElement = getElement(this.config.canvasElement);
}

Drawer.prototype._inheriteSizeParentElement = function () {
    this.config.canvasElement.width = this.config.canvasElement.parentElement.clientWidth - this.config.padding
    this.config.canvasElement.height = this.config.canvasElement.parentElement.clientHeight - this.config.padding
}

Drawer.prototype._hasPadding = function () {
    return !!this.config.padding;
}

Drawer.prototype._centerCanvasElementInParentElement = function () {
    this.config.canvasElement.parentElement.style.display = 'grid';
    this.config.canvasElement.parentElement.style.placeItems = 'center';
}

Drawer.prototype._drawGrid = function () {
    let numberOfGridInWidth = Math.ceil(this.config.canvasElement.width / this.config.grid.size.width);
    let numberOfGridInHeight = Math.ceil(this.config.canvasElement.height / this.config.grid.size.height);
    let maxHeight = numberOfGridInHeight * this.config.grid.size.height;
    let maxWidth = numberOfGridInWidth * this.config.grid.size.width;
    let h = numberOfGridInHeight;
    while (--h) {
        let w = numberOfGridInWidth;
        while (--w) {
            const x = w * this.config.grid.size.width;
            const y = h * this.config.grid.size.height;

            const verticalLine = new Line({
                point1: new Point({ x: x, y: 0 }),
                point2: new Point({ x: x, y: maxHeight }),
            });
            this.addShape(verticalLine);

            const horizontalLine = new Line({
                point1: new Point({ x: 0, y: y }),
                point2: new Point({ x: maxWidth, y: y }),
            });
            this.addShape(horizontalLine);
        }
    }
}

Drawer.prototype._drawAxis = function () {

}

Drawer.prototype._drawZeroPoint = function () {

}

Drawer.prototype.draw = function () {
    for (let shape of this.shapes) {
        shape.draw(this.config.canvasElement.getContext('2d'));
    }
}

/**
 * 
 * @param {Point|Line} shape 
 */
Drawer.prototype.addShape = function (shape) {
    this.shapes.push(shape);
}

export { Drawer };
export { Point };
export { Line };