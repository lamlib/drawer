/**
 * @typedef Option 
 * @property {number} x
 * @property {number} y
 * @property {number} id
 * @property {string} name
 */

/**
 * @param {Option} option 
 */
const Point = function (option) {
    this.x = option.x;
    this.y = option.y;
    this.id = option.id;
    this.name = option.name;
}

Point.prototype.isValidPoint = function () {
    return !(isNaN(this.x) || isNaN(this.y));
}

export { Point };