export function _isNullOrEmpty(str: string){
    return str?.indexOf(' ') >= 0 || str === "";    
}