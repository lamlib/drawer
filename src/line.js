import { Shape } from "./shape.js";
import { Point } from "./point.js";


/**
 * @typedef LineOpt 
 * @property {Point} point1
 * @property {Point} point2
 */

/**
 * 
 * @param {LineOpt} opt 
 */
const Line = function (opt) {
    Shape.call(this, opt);
    this.point1 = new Point(opt.point1);
    this.point2 = new Point(opt.point2);
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
Line.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
};

export { Line };