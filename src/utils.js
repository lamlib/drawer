/**
 * 
 * @param {object} target The object that is store data
 * @param {object} resorce The object that need passing data to target
 * @returns {object} The object is merged
 */
export const merge = function (target, resorce) {
    for(let i in resorce) {
        if (i in target && typeof resorce[i] === 'object' && typeof target[i] === 'object') {
            merge(target[i],  resorce[i]);
            continue;
        } 
        target[i] = resorce[i];
    }
    return target;
}

/**
 * @param {string | HTMLElement} element The element need to pick
 * @returns {HTMLElement | null} The official element.
 */
export const getElement = function (element) {
    if (element instanceof HTMLElement) {
        return document.getElementById(element);
    } else if (typeof element === 'string') {
        return element;
    } else {
        throw new Error("Element pass in to getElement must be string or HTMLElement");
    }
}