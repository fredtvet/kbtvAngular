export function _convertArrayToObject<T>(
  array: T[] | ReadonlyArray<T>, 
  key?: string | ( (entity: T) => string )
): { [key: string]: T } {
    if(!array || array.length == 0) return {};
    const result = {}; 
    let setter: (entity: T, result: Object) => void;

    if(!key) 
      setter = (entity: T, result: Object) => result[entity as any] = entity
    else if(typeof key === "string")
      setter = (entity: T, result: Object) => result[entity[key]] = entity
    else if(typeof key === "function")
      setter = (entity: T, result: Object) => result[key(entity)] = entity

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}