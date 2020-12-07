
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ControlHook } from '../interfaces';

export function _getControlObserver$<TResponse>(hook: ControlHook<TResponse>, form: FormGroup, ignoreInitial?: boolean): Observable<TResponse>{
    const control = form.get(hook.controlName);
    
    if(ignoreInitial) return control.valueChanges.pipe(map(hook.callback))  

    return control.valueChanges.pipe(
        startWith(control.value),
        map(hook.callback)
    )  
}