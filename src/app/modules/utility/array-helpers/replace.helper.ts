export function _replace<T>(array: T[], obj: T, id: any, identifier: string){
    if(!array || array.length == 0) return array;
    let arr = array.slice();
    for(let i = 0; i < arr.length; i++){
      let currObj = arr[i];
      if(currObj[identifier] === id){
        arr[i] = obj;
        break;
      }
    }
    return arr;
}