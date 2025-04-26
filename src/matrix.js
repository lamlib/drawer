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
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            res[row * 4 + col] = 0;
            for (let k = 0; k < 4; k++) {
                res[row * 4 + col] += a[row * 4 + k] * b[k * 4 + col];
            }
        }
    }
    return res;
};

/**
 * Nhân ma trận 4x4 với vector 4x1
 * @param {Float32Array} a Ma trận 4x4
 * @param {Float32Array} b Vector 4x1
 * @returns {Float32Array} Kết quả vector 4x1
 */
const multipleM4x4WithV4 = function (a, b) {
    const res = new Float32Array(4);
    for (let row = 0; row < 4; row++) {
        res[row] = 0;
        for (let k = 0; k < 4; k++) {
            res[row] += a[row * 4 + k] * b[k];
        }
    }
    return res;
};

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
};

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
};

/**
 * Tạo ma trận quay quanh trục X
 * @param {number} angle Góc quay (radian)
 * @returns {Float32Array} Ma trận quay 4x4
 */
const rotateX = function (angle) {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    res[5] = c;
    res[6] = -s;
    res[9] = s;
    res[10] = c;
    return res;
};

/**
 * Tạo ma trận quay quanh trục Y
 * @param {number} angle Góc quay (radian)
 * @returns {Float32Array} Ma trận quay 4x4
 */
const rotateY = function (angle) {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    res[0] = c;
    res[2] = s;
    res[8] = -s;
    res[10] = c;
    return res;
};

/**
 * Tạo ma trận quay quanh trục Z
 * @param {number} angle Góc quay (radian)
 * @returns {Float32Array} Ma trận quay 4x4
 */
const rotateZ = function (angle) {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    res[0] = c;
    res[1] = -s;
    res[4] = s;
    res[5] = c;
    return res;
};

/**
 * Tạo ma trận chiếu phối cảnh
 * @param {number} fov Góc nhìn (radian)
 * @param {number} aspect Tỉ lệ khung hình
 * @param {number} near Khoảng cách gần
 * @param {number} far Khoảng cách xa
 * @returns {Float32Array} Ma trận chiếu phối cảnh 4x4
 */
const perspectiveM4x4 = function (fov, aspect, near, far) {
    const res = new Float32Array(16);
    const f = 1.0 / Math.tan(fov / 2);
    res[0] = f / aspect;
    res[5] = f;
    res[10] = (far + near) / (near - far);
    res[11] = -1;
    res[14] = (2 * far * near) / (near - far);
    return res;
};


/**
 * Tạo ma trận nhìn từ một điểm đến một điểm
 * @param {Float32Array} eye Vị trí mắt (3 phần tử)
 * @param {Float32Array} target Điểm nhìn đến (3 phần tử)
 * @param {Float32Array} up Vector hướng lên (3 phần tử)
 * @returns {Float32Array} Ma trận nhìn 4x4
 */
const lookAtM4x4 = function (eye, target, up) {
    const zAxis = new Float32Array(3);
    const xAxis = new Float32Array(3);
    const yAxis = new Float32Array(3);

    // zAxis = normalize(eye - target)
    for (let i = 0; i < 3; i++) {
        zAxis[i] = eye[i] - target[i];
    }
    const zLength = Math.hypot(...zAxis);
    for (let i = 0; i < 3; i++) {
        zAxis[i] /= zLength;
    }

    // xAxis = normalize(cross(up, zAxis))
    xAxis[0] = up[1] * zAxis[2] - up[2] * zAxis[1];
    xAxis[1] = up[2] * zAxis[0] - up[0] * zAxis[2];
    xAxis[2] = up[0] * zAxis[1] - up[1] * zAxis[0];
    const xLength = Math.hypot(...xAxis);
    for (let i = 0; i < 3; i++) {
        xAxis[i] /= xLength;
    }

    // yAxis = cross(zAxis, xAxis)
    yAxis[0] = zAxis[1] * xAxis[2] - zAxis[2] * xAxis[1];
    yAxis[1] = zAxis[2] * xAxis[0] - zAxis[0] * xAxis[2];
    yAxis[2] = zAxis[0] * xAxis[1] - zAxis[1] * xAxis[0];

    const res = new Float32Array(16);
    res.set(identityM4x4);

    res[0] = xAxis[0];
    res[1] = yAxis[0];
    res[2] = zAxis[0];
    res[4] = xAxis[1];
    res[5] = yAxis[1];
    res[6] = zAxis[1];
    res[8] = xAxis[2];
    res[9] = yAxis[2];
    res[10] = zAxis[2];
    res[12] = -(xAxis[0] * eye[0] + xAxis[1] * eye[1] + xAxis[2] * eye[2]);
    res[13] = -(yAxis[0] * eye[0] + yAxis[1] * eye[1] + yAxis[2] * eye[2]);
    res[14] = -(zAxis[0] * eye[0] + zAxis[1] * eye[1] + zAxis[2] * eye[2]);

    return res;
};

/**
 * Tạo ma trận chiếu trực giao
 * @param {number} left Cạnh trái
 * @param {number} right Cạnh phải
 * @param {number} bottom Cạnh dưới
 * @param {number} top Cạnh trên
 * @param {number} near Cạnh gần
 * @param {number} far Cạnh xa
 * @returns {Float32Array} Ma trận chiếu trực giao 4x4
 */
const orthographicM4x4 = function (left, right, bottom, top, near, far) {
    const res = new Float32Array(16);
    res.set(identityM4x4);

    res[0] = 2 / (right - left);
    res[5] = 2 / (top - bottom);
    res[10] = -2 / (far - near);
    res[12] = -(right + left) / (right - left);
    res[13] = -(top + bottom) / (top - bottom);
    res[14] = -(far + near) / (far - near);

    return res;
};

/**
 * Tạo ma trận phản chiếu qua mặt phẳng XY
 * @returns {Float32Array} Ma trận phản chiếu 4x4
 */
const reflectXY = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[10] = -1; // Đảo chiều trục Z
    return res;
};

/**
 * Tạo ma trận phản chiếu qua mặt phẳng YZ
 * @returns {Float32Array} Ma trận phản chiếu 4x4
 */
const reflectYZ = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[0] = -1; // Đảo chiều trục X
    return res;
};

/**
 * Tạo ma trận phản chiếu qua mặt phẳng ZX
 * @returns {Float32Array} Ma trận phản chiếu 4x4
 */
const reflectZX = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[5] = -1; // Đảo chiều trục Y
    return res;
};

/**
 * Tạo ma trận xoay quanh một vector tùy ý
 * @param {Float32Array} axis Vector trục xoay (3 phần tử, đã được chuẩn hóa)
 * @param {number} angle Góc xoay (radian)
 * @returns {Float32Array} Ma trận xoay 4x4
 */
const rotateAroundAxis = function (axis, angle) {
    const res = new Float32Array(16);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;

    const x = axis[0];
    const y = axis[1];
    const z = axis[2];

    res[0] = t * x * x + c;
    res[1] = t * x * y - s * z;
    res[2] = t * x * z + s * y;
    res[3] = 0;

    res[4] = t * x * y + s * z;
    res[5] = t * y * y + c;
    res[6] = t * y * z - s * x;
    res[7] = 0;

    res[8] = t * x * z - s * y;
    res[9] = t * y * z + s * x;
    res[10] = t * z * z + c;
    res[11] = 0;

    res[12] = 0;
    res[13] = 0;
    res[14] = 0;
    res[15] = 1;

    return res;
};


/**
 * Tạo ma trận phản chiếu qua mặt phẳng tùy ý
 * @param {Float32Array} plane Vector mặt phẳng (4 phần tử: [a, b, c, d] với ax + by + cz + d = 0)
 * @returns {Float32Array} Ma trận phản chiếu 4x4
 */
const reflectPlane = function (plane) {
    const res = new Float32Array(16);
    const [a, b, c, d] = plane;
    const lenSq = a * a + b * b + c * c;

    res[0] = 1 - 2 * (a * a) / lenSq;
    res[1] = -2 * (a * b) / lenSq;
    res[2] = -2 * (a * c) / lenSq;
    res[3] = 0;

    res[4] = -2 * (b * a) / lenSq;
    res[5] = 1 - 2 * (b * b) / lenSq;
    res[6] = -2 * (b * c) / lenSq;
    res[7] = 0;

    res[8] = -2 * (c * a) / lenSq;
    res[9] = -2 * (c * b) / lenSq;
    res[10] = 1 - 2 * (c * c) / lenSq;
    res[11] = 0;

    res[12] = -2 * (a * d) / lenSq;
    res[13] = -2 * (b * d) / lenSq;
    res[14] = -2 * (c * d) / lenSq;
    res[15] = 1;

    return res;
};

/**
 * Tạo ma trận chiếu lên mặt phẳng XY
 * @returns {Float32Array} Ma trận chiếu 4x4
 */
const projectXY = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[8] = 0;
    res[9] = 0;
    res[10] = 0;
    return res;
};

/**
 * Tạo ma trận chiếu lên mặt phẳng YZ
 * @returns {Float32Array} Ma trận chiếu 4x4
 */
const projectYZ = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[0] = 0;
    res[8] = 0;
    res[10] = 0;
    return res;
};

/**
 * Tạo ma trận chiếu lên mặt phẳng ZX
 * @returns {Float32Array} Ma trận chiếu 4x4
 */
const projectZX = function () {
    const res = new Float32Array(16);
    res.set(identityM4x4);
    res[0] = 0;
    res[1] = 0;
    res[5] = 0;
    return res;
};


