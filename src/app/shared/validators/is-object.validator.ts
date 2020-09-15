import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isObjectValidator(allowNull?: boolean): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
      let invalid = !(control.value instanceof Object);
      if(allowNull && invalid) invalid = !(control.value == null || control.value.length === 0);
      return invalid ? {'objectInvalid': {value: control.value}} : null;
    };
  }