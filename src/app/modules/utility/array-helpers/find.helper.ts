export function _find<T>(array: T[], value: any, identifier: Extract<keyof T, string>){
    if(!array || array.length == 0 || !value) return;

    for(let i = 0; i < array.length; i++){
      const obj = array[i];
      if(obj[identifier] === value) return {...obj};   
    }
}