
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ControlHook } from '../interfaces';

/** Responsible for creating an observer from a {@link ControlHook}
 *  that executes the hooks callback on value changes. 
 * @param hook A control hook to create an observer with
 * @param form A form containing the control
 * @param ignoreInitial Set to true if initial control value should be ignored.
 * @returns An observable of the hooks callback response */
export function _getControlObserver$<TResponse>(
    hook: ControlHook<TResponse>, 
    form: FormGroup, 
    ignoreInitial?: boolean): Observable<TResponse>{
    const control = form.get(hook.controlName);
    
    if(!control) return throwError(`No control for name ${hook.controlName}`)

    if(ignoreInitial) return control.valueChanges.pipe(map(hook.callback))  

    return control.valueChanges.pipe(
        startWith(control.value),
        map(hook.callback)
    )  
}