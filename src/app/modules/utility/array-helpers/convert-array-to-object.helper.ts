export function _convertArrayToObject<T>(array: T[] | ReadonlyArray<T>, key?: string): { [key: string]: T } {
    if(!array || array.length == 0) return {};
    const result = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      result[key ? entity[key] : entity] = entity
    }
    return result;
}