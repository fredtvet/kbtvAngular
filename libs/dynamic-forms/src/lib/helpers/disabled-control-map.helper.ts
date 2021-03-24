import { DisabledControls } from '../interfaces';

/** Responsible for creating a {@link DisabledControls} object
 *  where form values that are null or undefined will be disabled.
 * @param formValue The value of the form T
 * @param disableAll Set to true if all controls should be disabled 
 * @returns A map of disabled controls */
export function _disableControlsWithNoValue<T>(formValue: T, disableAll?: boolean): DisabledControls<T>{
    let result = {} as DisabledControls<T>;

    for(const key in formValue){
        if(disableAll) result[key] = true;
        else if(formValue[key]) result[key] = true;
    }

    return result;
}