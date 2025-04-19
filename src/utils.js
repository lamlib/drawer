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