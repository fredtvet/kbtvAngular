import { Timesheet } from './timesheet.model';

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
}
