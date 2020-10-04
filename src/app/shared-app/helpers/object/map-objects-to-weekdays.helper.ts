export function _mapObjectsToWeekdays<TObject>(objects: TObject[], dateProp: string): { [key: number]: TObject }{
  if(!objects) return;
  const result: { [key: number]: TObject } = {};
  for(let i = 0; i < objects.length; i++){
    const obj = objects[i];
    result[new Date(obj[dateProp]).getDay() || 7] = obj;
  }
  return result;
}