import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../interfaces/app-button.interface';
import { ButtonTypes } from '../enums/button-types.enum';

@Pipe({
  name: 'transformButtons'
})
export class TransformButtonsPipe implements PipeTransform {

  transform(buttons: AppButton[], newType: ButtonTypes): AppButton[] {
    if(!buttons) return buttons; //No buttons no roles

    let result: AppButton[] = [];

    for(let i = 0; i < buttons.length; i++){
        result.push({...buttons[i], type: newType});
    }
    
    return result;
  }

}
