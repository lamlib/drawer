import { Point } from "./point";

const Shape = function (option) {
    Point.call(this, option);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Shape.prototype.draw = function (ctx) {
    throw new Error("Draw method must be overried!");
}

export { Shape };