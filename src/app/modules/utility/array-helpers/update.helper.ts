export function _update<T>(array: T[], updatedObj: Partial<T>, identifier: string){
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      let obj = arr[i];
      if(obj[identifier] === updatedObj[identifier]){
        arr[i] = {...Object.assign(obj, updatedObj)};
        break;
      }
    }
    return arr;
}