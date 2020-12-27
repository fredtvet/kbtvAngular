import { ImmutableArray, Immutable, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';

export function _groupBy<T>(
  array: Maybe<ImmutableArray<T>>, 
  key: Prop<Immutable<T>>
): {[key: string] : Immutable<T>[]}{
    if(!array?.length) return {};
    const result: {[key: string] : Immutable<T>[]} = {}; 
    for(var i = 0; i < array.length; i++){
      const entity = array[i];
      (result[<string> entity[key]] = result[<string> entity[key]] || []).push(entity);
    }
    return result
}