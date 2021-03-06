import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { _weakMemoizer } from './util/weak-memoizer.helper';

/**
 * Filter an array of items, only returning the ones who pass the specified expression
 * @param originals - An array of items to be filtered
 * @param expression - An expression for filtering the items
 * @returns An array of items that passed the expression
 */
export const _filter = _weakMemoizer(filter);

function filter<T>(
  originals: Maybe<ImmutableArray<T>>, 
  expression: (value: Immutable<T>, index?: number, Array?: unknown[]) => boolean): Immutable<T>[] {
    if(!originals?.length) return [];
    let filtered = [];
    for(let i = 0; i < originals.length; i++){
      let obj = originals[i];
      if(expression(obj)) filtered.push(obj);
    }
    return filtered;
}