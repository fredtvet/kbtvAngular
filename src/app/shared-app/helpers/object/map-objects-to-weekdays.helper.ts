import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _mapObjectsToWeekdays<T>(objects: ImmutableArray<T>, dateProp: string): { [key: number]: Immutable<T> }{
  if(!objects) return;
  const result: { [key: number]: Immutable<T> } = {};
  for(let i = 0; i < objects.length; i++){
    const obj = objects[i];
    result[new Date(obj[dateProp]).getDay() || 7] = obj;
  }
  return result;
}