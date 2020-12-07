import { DisabledObjectMap } from '../interfaces';

export function _objectToDisabledObjectMap<T>(object: T, disableAll?: boolean): DisabledObjectMap<T>{
    let result = {} as DisabledObjectMap<T>;

    for(const key in object){
        if(disableAll) result[key] = true;
        else if(object[key]) result[key] = true;
    }

    return result;
}