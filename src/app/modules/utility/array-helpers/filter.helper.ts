import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _filter<T>(
  originals: ImmutableArray<T>, 
  expression: (value: Immutable<T>, index?: number, Array?: unknown[]) => boolean): Immutable<T>[] {
    if(!originals?.length) return [];
    let filtered = [];
    for(let i = 0; i < originals.length; i++){
      let obj = originals[i];
      if(expression(obj)) filtered.push(obj);
    }
    return filtered;
}