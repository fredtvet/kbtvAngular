import { ValidatorFn, AbstractControl } from '@angular/forms';
import { validateFileExtension } from '../helpers/validate-file-extension.helper';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value == null) return null;
        const invalid = !validateFileExtension(control.value, allowedExtensions);
        return invalid ? {'fileExtensionInvalid': {value: control.value}} : null;
    };
}

