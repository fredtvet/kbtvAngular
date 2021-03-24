import { ValidatorFn, AbstractControl } from '@angular/forms';
import { UnknownState } from 'global-types';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';

export function fileSizeValidator(maxSize: number): ValidatorFn{ 
    return (control: AbstractControl): UnknownState | null => {
        if(control.value == null) return null;
        const invalid = (<File>control.value).size > maxSize;
        return invalid ? {'filesize': {value: control.value, maxSize}} : null;
    };
}

