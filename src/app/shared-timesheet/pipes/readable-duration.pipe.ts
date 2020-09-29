import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableDuration'
})
export class ReadableDurationPipe implements PipeTransform {

  transform(hours: number, format: string = "long"): string {
    let fullHours = Math.floor(hours); //Floor to get full hours
    let minutes = Math.floor((hours - fullHours)*60); //Get leftover and convert to minutes

    if(format === 'short')
      return fullHours + 't ' + minutes + 'min';
    else
      return fullHours + ' timer ' + minutes + ' minutter';
  }

}
