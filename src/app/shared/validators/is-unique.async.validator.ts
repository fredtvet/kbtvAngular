import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ImmutableArray } from '@immutable/interfaces';
import { UnknownState } from '@model/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

    export function isUniqueAsyncValidator(data$: Observable<ImmutableArray<unknown>>, identifier?: string): AsyncValidatorFn{ 
        return (control: AbstractControl): Observable<UnknownState | null> => {
          return data$.pipe(map(data => {
              let findFunc: (x: unknown) => boolean;
              if(identifier) findFunc = (x: unknown) => x[identifier] === control.value;
              else findFunc = (x: unknown) => x === control.value;
              
              const invalid = data?.find(findFunc); 
              return invalid ? {'isunique': {value: control.value}} : null;
          }))
        };
    }
  