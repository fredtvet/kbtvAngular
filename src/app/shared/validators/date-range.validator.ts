import { ValidatorFn, AbstractControl } from '@angular/forms';

export function dateRangeValidator(allowNull?: boolean): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
      let invalid: boolean;
      
      if(allowNull && control.value == null) invalid = false;
      else invalid = control.value == null || !control.value[0] || !control.value[1];

      return invalid ? {'dateRangeInvalid': {value: control.value}} : null;
    };
  }

