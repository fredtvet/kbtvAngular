import { ValidatorFn, AbstractControl } from "@angular/forms";

export class ValueSelectedValidator {
  static valueSelected(arr: any[], property: any): ValidatorFn {
    return (ac: AbstractControl): { [key: string]: boolean } | null => {
      let matches = arr.filter(x => x[property] === ac.value);
      if (matches.length > 0) return null; //Value exists in array
      else  return { noMatchesFound: true }; //No matches found  
    };
  }
}
