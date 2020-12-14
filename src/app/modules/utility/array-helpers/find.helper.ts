import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _find<T>(
  array: ImmutableArray<T>, 
  value: any, 
  identifier: Extract<keyof Immutable<T>, string>): Immutable<T>{
    if(!array?.length || !value) return;

    for(let i = 0; i < array.length; i++){
      const obj = array[i];
      if(obj[identifier] === value) return obj;   
    }
}