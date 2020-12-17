import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Immutable, ImmutableArray, Maybe, UnknownState } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function isUniqueAsyncValidator<T>(
    data$: Observable<Maybe<ImmutableArray<T>>>, identifier?: Prop<Immutable<T>>): AsyncValidatorFn{ 
    return (control: AbstractControl): Observable<UnknownState | null> => {
        return data$.pipe(map(data => {
            let findFunc: (x: Immutable<T>) => boolean;
            if(identifier) findFunc = (x: Immutable<T>) => x[identifier] === control.value;
            else findFunc = (x: Immutable<T>) => x === control.value;
            
            const invalid = data?.find(findFunc); 
            return invalid ? {'isunique': {value: control.value}} : null;
        }))
    };
}