import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sameDate'
})
export class SameDatePipe implements PipeTransform {

  transform(firstDate: Date, secondDate: Date): boolean {
    return firstDate.setHours(0,0,0,0) == secondDate.setHours(0,0,0,0)
  }

}
