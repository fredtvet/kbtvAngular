export function _isNullOrEmpty(str: string){
    return !str || str.indexOf(' ') >= 0 || str === "";    
}