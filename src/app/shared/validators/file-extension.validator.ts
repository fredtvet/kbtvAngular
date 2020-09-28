import { ValidatorFn, AbstractControl } from '@angular/forms';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn{ 
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.value == null) return null;
        const invalid = !_validateFileExtension(control.value, allowedExtensions);
        return invalid ? {'fileExtensionInvalid': {value: control.value}} : null;
    };
}

