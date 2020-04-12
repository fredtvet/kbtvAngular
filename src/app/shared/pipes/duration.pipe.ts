import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(startTime: Date, endTime: Date, format: string = "long"): string {
    let diff = Math.abs(new Date(endTime).getTime() - new Date(startTime).getTime());
    let hours = diff/1000/60/60; //Convert diff to hours
    let fullHours = Math.floor(hours); //Floor to get full hours
    let minutes = (hours - fullHours)*60; //Get leftover and convert to minutes

    if(format === 'short')
      return fullHours + 't ' + minutes + 'min';
    else
      return fullHours + ' timer ' + minutes + ' minutter';
  }

}
