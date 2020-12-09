import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isObjectValidator(): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
      let invalid = !(!control.value || control.value instanceof Object);
      return invalid ? {'isobject': {value: control.value}} : null;
    };
  }