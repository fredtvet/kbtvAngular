import { Pipe, PipeTransform } from '@angular/core';
import { Timesheet } from '../models/timesheet.model';

@Pipe({
  name: 'sortByTimesheetStatus'
})
export class SortByTimesheetStatusPipe implements PipeTransform {

  transform(timesheets: Timesheet[], openFirst: boolean = true): any {
    if(openFirst)
      return [...timesheets.sort((x, y) => (x.status === y.status)? 0 : x.status? 1 : -1)];
    else
      return [...timesheets.sort((x, y) => (x.status === y.status)? 0 : x.status? -1 : 1)];
  }

}
