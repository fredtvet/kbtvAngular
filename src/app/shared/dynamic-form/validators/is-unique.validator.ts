import { ValidatorFn, AbstractControl } from '@angular/forms';

    export function isUniqueValidator(data: any[], identifier?: string): ValidatorFn{ 
        return (control: AbstractControl): {[key: string]: any} | null => {
          let findFunc: (x: any) => boolean;
          if(identifier) findFunc = (x: any) => x[identifier] === control.value;
          else findFunc = (x: any) => x === control.value;
          
          const invalid = data.find(findFunc); 
          return invalid ? {'isunique': {value: control.value}} : null;
        };
    }
  