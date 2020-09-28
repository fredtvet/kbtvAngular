export function _groupBy<T>(array: T[], key: string): {[key: string] : T[]}{
    if(!array || array.length == 0) return {};
    const result = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      (result[entity[key]] = result[entity[key]] || []).push(entity);
    }
    return result
}