import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../../shared-app/interfaces/app-button.interface';
import { ButtonTypes } from '../../shared-app/enums/button-types.enum';
import { Maybe } from 'global-types';

@Pipe({name: 'transformButton'})
export class TransformButtonPipe implements PipeTransform {

  transform(button: AppButton, newType: ButtonTypes): Maybe<AppButton> {
    return button ? {...button, type: newType} : null;
  }

}
