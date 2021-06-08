import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Pipe({name: 'transformButtons'})
export class TransformButtonsPipe implements PipeTransform {

  transform(buttons: AppButton[], newValues: Partial<AppButton>): AppButton[] {
    if(!buttons) return buttons; //No buttons no roles

    let result: AppButton[] = [];

    for(let i = 0; i < buttons.length; i++){
        result.push({...buttons[i], ...newValues});
    }
    
    return result;
  }

}
