import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../interfaces/app-button.interface';
import { ButtonTypes } from '../enums/button-types.enum';

@Pipe({
  name: 'transformButton'
})
export class TransformButtonPipe implements PipeTransform {

  transform(button: AppButton, newType: ButtonTypes): AppButton {
    if(!button) return undefined; //No buttons no roles   
    return {...button, type: newType};
  }

}
