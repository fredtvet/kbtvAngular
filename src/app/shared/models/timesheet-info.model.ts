import { Timesheet } from './timesheet.model';
import { TimesheetStatus } from '../enums/timesheet-status.enum';

export class TimesheetInfo {

  constructor(
    public closedTimesheets: Timesheet[] = [],
    public openTimesheets: Timesheet[] = []
  ){ };

  calcTotalHoursClosed(): number{
    return this.closedTimesheets.reduce((a, b) => a + (b['totalHours'] || 0), 0);
  }

  calcTotalHoursOpen(): number{
    return this.openTimesheets.reduce((a, b) => a + (b['totalHours'] || 0), 0);
  }

  addTimesheet(timesheet: Timesheet){
    if(timesheet.status == TimesheetStatus.Open)
      this.openTimesheets.push(timesheet);
    else
      this.closedTimesheets.push(timesheet);
  }
}
