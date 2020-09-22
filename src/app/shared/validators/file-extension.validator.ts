import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value == null) return null;
        const invalid = !validateFileExtension(control.value, allowedExtensions);
        return invalid ? {'fileExtensionInvalid': {value: control.value}} : null;
    };
}

export function validateFileExtension(file: File, allowedExtensions: string[]): boolean{
    return allowedExtensions.includes(file.name?.split('.').pop());
}

