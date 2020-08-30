import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../../shared-app/interfaces/app-button.interface';
import { ButtonTypes } from '../../shared-app/enums/button-types.enum';

@Pipe({
  name: 'transformButton'
})
export class TransformButtonPipe implements PipeTransform {

  transform(button: AppButton, newType: ButtonTypes): AppButton {
    if(!button) return undefined; //No buttons no roles   
    return {...button, type: newType};
  }

}
