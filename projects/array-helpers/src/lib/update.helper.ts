import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';

export function _update<T extends {}>(
  array: Maybe<ImmutableArray<T>>, 
  updatedObj: Partial<Immutable<T>>, 
  identifier: Prop<Immutable<T>>): Immutable<T>[] {
    if(!array?.length) return [];
    const arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      const obj = arr[i];
      if(obj[identifier] === updatedObj[identifier]){
        arr[i] = {...obj, ...updatedObj};
        break;
      }
    }
    return <Immutable<T>[]> arr;
}