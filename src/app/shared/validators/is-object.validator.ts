import { ValidatorFn, AbstractControl } from '@angular/forms';
import { UnknownState } from '@model/interfaces';

export function isObjectValidator(): ValidatorFn{ 
    return (control: AbstractControl): UnknownState | null => {
      let invalid = !(!control.value || control.value instanceof Object);
      return invalid ? {'isobject': {value: control.value}} : null;
    };
  }