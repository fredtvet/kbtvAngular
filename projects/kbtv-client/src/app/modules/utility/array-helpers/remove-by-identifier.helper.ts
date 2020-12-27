import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';

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