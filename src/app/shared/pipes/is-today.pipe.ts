import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(value: Date | string | number): any {
    const today = new Date();
    const date = new Date(value);
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
  }

}