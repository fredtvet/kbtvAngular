export function _filter<T>(originals: ReadonlyArray<T>, expression: (value: T, index?: number, Array?: any[]) => boolean): T[]{
    if(!originals || originals.length == 0) return undefined;
    let filtered = [];
    for(let i = 0; i < originals.length; i++){
      let obj = originals[i];
      if(expression(obj)) filtered.push(obj);
    }
    return filtered;
}