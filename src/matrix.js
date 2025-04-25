// MVP = projection x view x model 

//  model = translate x rotate x scale

//  view = 

//  projection 
const m = new Float32Array(16);
const v = new Float32Array(16);
const p = new Float32Array(16);

/**
 * Ma trận đơn vị 
 */
const identityM4x4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
];


/**
 * Nhân hai ma trận 4 x 4
 * @param {Float32Array} a Ma trận 4 x 4 thứ nhất
 * @param {Float32Array} b Ma trận 4 x 4 thứ hai
 * @returns {Float32Array} Kết quả ma trận 4 x 4
 */
const multipleM4x4WithM4x4 = function (a, b) {
    const res = new Float32Array(16);
    for(let row = 0; row < 4; row++) {
        for( let col = 0; col < 4; col++) {
            res[row * 4 + col] = 0;
            for( let k = 0; k < 4; k++) {
                res[row * 4 + col] += a[row * 4 + k] * b[k * 4 + col];
            }
        }
    }
    return res;
}

/**
 * Nhân ma trận 4x4 với vector 4x1
 * @param {Float32Array} a Ma trận 4x4
 * @param {Float32Array} b Vector 4x1
 * @returns {Float32Array} Kết quả vector 4x1
 */
const multipleM4x4WithV4 = function (a, b) {
    const res = new Float32Array(4);
    for(let row = 0; row < 4; row++) {
        res[row] = 0;
        for( let k = 0; k < 4; k++) {
            res[row] += a[row * 4 + k] * b[k];
        }
    }
    return res;
}

/**
 * Tạo ma trận tỉ lệ
 * @param {number} sx Tỉ lệ theo trục X
 * @param {number} sy Tỉ lệ theo trục Y
 * @param {number} sz Tỉ lệ theo trục Z
 * @returns {Float32Array} Ma trận tỉ lệ 4x4
 */
const scaleM4x4 = function (sx, sy, sz) {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[0] = sx;
    res[5] = sy;
    res[10] = sz;
    return res;
}

/**
 * Tạo ma trận dịch chuyển
 * @param {number} tx Dịch chuyển theo trục X
 * @param {number} ty Dịch chuyển theo trục Y
 * @param {number} tz Dịch chuyển theo trục Z
 * @returns {Float32Array} Ma trận dịch chuyển 4x4
 */
const translateM4x4 = function (tx, ty, tz) {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[12] = tx;
    res[13] = ty;
    res[14] = tz;
    return res;
}
