import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

    export function isUniqueAsyncValidator(data$: Observable<any[]>, identifier?: string): AsyncValidatorFn{ 
        return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
          return data$.pipe(map(data => {
              let findFunc: (x: any) => boolean;
              if(identifier) findFunc = (x: any) => x[identifier] === control.value;
              else findFunc = (x: any) => x === control.value;
              
              const invalid = data.find(findFunc); 
              return invalid ? {'isunique': {value: control.value}} : null;
          }))
        };
    }
  