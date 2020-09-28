export function _add<T>(array: T[], value: T): T[]{
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    arr.unshift(value);
    return arr;
}