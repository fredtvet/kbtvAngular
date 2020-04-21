import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';
import { DateTimeService } from './date-time.service';
import { TimePeriods } from 'src/app/shared/enums';
import { TimesheetSummary } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TimesheetAggregatorService {

  constructor(private dateTimeService: DateTimeService) {}

  groupByTimePeriod(period: TimePeriods, t: Timesheet[]): TimesheetSummary[]{
      switch(period){
          case TimePeriods.Day: return this.groupByDay(t);
          case TimePeriods.Week: return this.groupByWeek(t);
          case TimePeriods.Month: return this.groupByMonth(t);
          case TimePeriods.Year: return this.groupByYear(t);
      }
  }
  
  groupByDay(t: Timesheet[]): TimesheetSummary[]{
    console.time('grping');
    const obj_arr = t.reduce((groups, timesheet) => {
      const date = timesheet.startTime.toString().split('T')[0];
      const index = date + '-' + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {userName: timesheet.userName, date, totalHours: 0, timesheets: []};
      }

      groups[index].totalHours += timesheet.totalHours;
      groups[index].timesheets.push(timesheet);
      
      return groups;
    }, {})

    let result = [];
    Object.keys(obj_arr).forEach(x => result.push(obj_arr[x]));
    return result;
  }

  groupByWeek(t: Timesheet[]): TimesheetSummary[]{
    console.time('grping');
    const obj_arr = t.reduce((groups, timesheet) => {
        const date = new Date(timesheet.startTime);
        const weekNr = this.dateTimeService.getWeekOfYear(date);
        const year = date.getFullYear();
        const index = year + '-' + weekNr + '-' + timesheet.userName;
        if (!groups[index]) {
          groups[index] = {userName: timesheet.userName, year, weekNr, totalHours: 0, timesheets: []};
        }
  
        groups[index].totalHours += timesheet.totalHours;
        groups[index].timesheets.push(timesheet);
  
        return groups;
      }, []);

    let result = [];
    Object.keys(obj_arr).forEach(x => result.push(obj_arr[x]));
    return result;
  }

  groupByMonth(t: Timesheet[]): TimesheetSummary[]{
    console.time('grping');
    const obj_arr = t.reduce((groups, timesheet) => {

        const month = new Date(timesheet.startTime).getMonth();
        const year = new Date(timesheet.startTime).getFullYear();
        const index = year + '-' + month + '-' + timesheet.userName;;
        if (!groups[index]) {
          groups[index] = {userName: timesheet.userName, year, month, totalHours: 0, timesheets: []};
        }
  
        groups[index].totalHours += timesheet.totalHours;
        groups[index].timesheets.push(timesheet);
  
        return groups;
      }, []);

    let result = [];
    Object.keys(obj_arr).forEach(x => result.push(obj_arr[x]));
    return result;
  }

  groupByYear(t: Timesheet[]): TimesheetSummary[]{
    console.time('grping');
    const obj_arr = t.reduce((groups, timesheet) => {

        const year = new Date(timesheet.startTime).getFullYear();
        const index = year + '-' + timesheet.userName;

        if (!groups[index]) {
          groups[index] = {userName: timesheet.userName, year, totalHours: 0, timesheets: []};
        }
  
        groups[index].totalHours += timesheet.totalHours;
        groups[index].timesheets.push(timesheet);
  
        return groups;
      }, []); 

    let result = [];
    Object.keys(obj_arr).forEach(x => result.push(obj_arr[x]));
    return result;
    };
}
