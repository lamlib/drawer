import { DEFAULT_CONFIG } from "./consts.js";
import { merge } from "./utils.js";

/**
 * @param {object} option 
 */
const Drawer = function (option) {
    this.config = merge(DEFAULT_CONFIG, option);
};

Drawer.prototype.drawGrid = function () {

}

Drawer.prototype.drawAxis = function () {

}

Drawer.prototype.drawZeroPoint = function () {

}

const drawer = new Drawer({
    canvasElement: 'hello',
})

console.log(drawer);
