import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';

export function _find<T>(
  array: Maybe<ImmutableArray<T>>, 
  value: unknown, 
  identifier: Prop<Immutable<T>>): Maybe<Immutable<T>> {
    if(!array?.length || !value) return;

    for(let i = 0; i < array.length; i++){
      const obj = array[i];
      if(obj[identifier] === value) return obj;   
    }
    return;
}