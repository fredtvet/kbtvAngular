import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../interfaces/app-button.interface';

@Pipe({
  name: 'reverseArray'
})
export class ReverseArrayPipe implements PipeTransform {

  transform(arr: any[]) {
    return arr.slice().reverse();
  }

}
