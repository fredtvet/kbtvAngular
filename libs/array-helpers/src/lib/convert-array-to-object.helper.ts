import { Immutable, ImmutableArray, Maybe, Prop} from 'global-types';


type Response<T> = { [key: string]: Immutable<T> }
/**
 * Convert an array to a key/value object
 * @param array 
 * @param key An item property or function used as key in the object. If null, the value is used as key.
 * @returns An object containing keys with accociated values
 */
export function _convertArrayToObject<T>(
  array: Maybe<ImmutableArray<T>>, 
  key: Prop<Immutable<T>> | ((t: Immutable<T>) => string)  
): Response<T> {
    if(!array?.length) return {};
    
    const result: Response<T> = {}; 
    
    let setter: (entity: Immutable<T>, result: Response<T>) => void;

    switch(typeof key){
      case "string": 
        setter = (entity: Immutable<T>, result: Response<T>) => result[<string> entity[key]] = entity; 
        break;
      case "function":
        setter = (entity: Immutable<T>, result: Response<T>) => result[key(entity)] = entity
        break;
      default:
        throw new Error("Key must be of type string or function")
    }

    for(var i = 0; i < array.length; i++) setter(array[i], result);

    return result;
}