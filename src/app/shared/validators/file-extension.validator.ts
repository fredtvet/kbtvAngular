import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value == null) return null;
        const extension = control.value.name?.split('.').pop();
        const invalid = !allowedExtensions.includes(extension);
        console.log(extension,invalid)
        return invalid ? {'fileExtensionInvalid': {value: control.value}} : null;
    };
}

