import { ValidatorFn, AbstractControl } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = !control.value[0] || !control.value[1];
      return invalid ? {'dateRangeInvalid': {value: control.value}} : null;
    };
  }

