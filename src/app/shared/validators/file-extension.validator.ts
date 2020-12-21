import { ValidatorFn, AbstractControl } from '@angular/forms';
import { UnknownState } from '@global/interfaces';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';

export function fileExtensionValidator(allowedExtensions: string[]): ValidatorFn{ 
    return (control: AbstractControl): UnknownState | null => {
        if(control.value == null) return null;
        const invalid = !_validateFileExtension(control.value, allowedExtensions);
        return invalid ? {'fileextension': {value: control.value}} : null;
    };
}
