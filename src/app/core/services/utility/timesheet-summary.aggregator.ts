import { Injectable } from '@angular/core';
import { Timesheet, User } from 'src/app/core/models';
import { DateTimeService } from './date-time.service';
import { GroupByPeriod, TimesheetStatus } from 'src/app/shared-app/enums';
import { TimesheetSummary } from 'src/app/shared-app/interfaces';
import { ArrayHelperService } from './array-helper.service';

@Injectable({
  providedIn: "root",
})
export class TimesheetSummaryAggregator {
  constructor(private dateTimeService: DateTimeService) {}

  groupByType(type: GroupByPeriod, t: Timesheet[]): TimesheetSummary[] {
    switch (type) {
      case GroupByPeriod.Day:
        return this.groupByDay(t);
      case GroupByPeriod.Week:
        return this.groupByWeek(t);
      case GroupByPeriod.Month:
        return this.groupByMonth(t);
      case GroupByPeriod.Year:
        return this.groupByYear(t);
    }
  }

  groupByDay(t: Timesheet[]): TimesheetSummary[] {
    if(!t) return undefined;
    const obj_arr = t.reduce((groups, timesheet) => {
      const date = timesheet.startTime.toString().split("T")[0];
      const index = date + "-" + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          date,
          openHours: 0,
          confirmedHours: 0,
          timesheets: [],
        };
      }

      if (timesheet.status == TimesheetStatus.Open)
        groups[index].openHours += timesheet.totalHours;
      else if (timesheet.status == TimesheetStatus.Confirmed)
        groups[index].confirmedHours += timesheet.totalHours;

      groups[index].timesheets.push(timesheet);

      return groups;
    }, {});
    return Object.values(obj_arr);;
  }

  groupByWeek(t: Timesheet[]): TimesheetSummary[] {
    if(!t) return undefined;
    let groups = {} as {[key: string]: TimesheetSummary};
    for(let i = 0; i < t.length; i++){
      let timesheet = t[i];
      const wy = this.dateTimeService.getWeekAndYearFromString(timesheet.startTime);
      const index = wy.year + "-" + wy.week + "-" + timesheet.userName;

      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year: wy.year,
          week: wy.week,
          openHours: 0,
          confirmedHours: 0,
          timesheets: [],
        };
      }  

      if (timesheet.status === TimesheetStatus.Open)
        groups[index].openHours += timesheet.totalHours;
      else
        groups[index].confirmedHours += timesheet.totalHours;

      groups[index].timesheets.push(timesheet);
    }
    return Object.values(groups);
  }

  groupByWeekRange(timesheets: Timesheet[],startWeek: number, endWeek: number, year: number, excludeStatus?: TimesheetStatus): TimesheetSummary[] {
    if(!timesheets) return undefined;
    const obj_arr = timesheets.reduce((groups, timesheet) => {
      if(timesheet.status == excludeStatus) return groups;
      const date = new Date(timesheet.startTime);
      if(date.getFullYear() !== year) return groups;
      const weekNr = this.dateTimeService.getWeekOfYear(date);
      if (weekNr >= startWeek && weekNr <= endWeek) {
        if (!groups[weekNr])
          groups[weekNr] = { week: weekNr,timesheets: [],openHours: 0,confirmedHours: 0,} as TimesheetSummary;

        groups[weekNr].timesheets.push(timesheet);

        if (timesheet.status == TimesheetStatus.Open)
          groups[weekNr].openHours += timesheet.totalHours;
        else if (timesheet.status == TimesheetStatus.Confirmed)
          groups[weekNr].confirmedHours += timesheet.totalHours;
      }
      return groups;
    }, {});

    return Object.values(obj_arr);
  }

  groupByMonth(t: Timesheet[]): TimesheetSummary[] {
    if(!t) return undefined;
    const obj_arr = t.reduce((groups, timesheet) => {
      const date = new Date(timesheet.startTime);
      const month = date.getMonth();
      const year = date.getFullYear();
      const index = year + "-" + month + "-" + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          month,
          openHours: 0, confirmedHours: 0,
          timesheets: [],
        };
      }

      if (timesheet.status == TimesheetStatus.Open)
        groups[index].openHours += timesheet.totalHours;
      else if (timesheet.status == TimesheetStatus.Confirmed)
        groups[index].confirmedHours += timesheet.totalHours;

      groups[index].timesheets.push(timesheet);

      return groups;
    }, []);

    return Object.values(obj_arr);
  }

  groupByYear(t: Timesheet[]): TimesheetSummary[] {
    if(!t) return undefined;
    const obj_arr = t.reduce((groups, timesheet) => {
      const year = new Date(timesheet.startTime).getFullYear();
      const index = year + "-" + timesheet.userName;

      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          openHours: 0, confirmedHours: 0,
          timesheets: [],
        };
      }

      if (timesheet.status == TimesheetStatus.Open)
        groups[index].openHours += timesheet.totalHours;
      else if (timesheet.status == TimesheetStatus.Confirmed)
        groups[index].confirmedHours += timesheet.totalHours;

      groups[index].timesheets.push(timesheet);

      return groups;
    }, []);

    return Object.values(obj_arr);;
  }

}
