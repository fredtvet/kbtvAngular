import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';

/**
 * Remove an object from an array of objects
 * @param originals An array of objects
 * @param deletedId A unique value used to find the object to delete
 * @param identifier A property on the object that contains the unique value
 */
export function _removeByIdentifier<T>(
  originals: Maybe<ImmutableArray<T>>, 
  deletedId: ImmutableArray<unknown>, 
  identifier: Prop<Immutable<T>>): Immutable<T>[]{       
    if(!originals?.length) return []; //If initial array empty, just return empty array

    let arr2 = originals.slice();
    for(var i = 0; i<arr2.length;i++){
      if(arr2[i][identifier] === deletedId){ 
        arr2.splice(i, 1);
        break;        	          
      }      
    };

    return arr2;
}