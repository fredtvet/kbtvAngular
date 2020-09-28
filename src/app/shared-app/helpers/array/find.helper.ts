export function _find<T>(array: T[], value: any, identifier: string){
    if(!array || array.length == 0 || !value) return undefined;
    let result: T;
    for(let i = 0; i < array.length; i++){
      let obj = array[i];
      if(obj[identifier] === value){
        result = {...obj};
        break;
      };
    }
    return result;
}