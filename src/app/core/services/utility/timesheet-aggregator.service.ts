import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';
import { DateTimeService } from './date-time.service';
import { TimePeriods, TimesheetStatus } from 'src/app/shared/enums';
import { TimesheetSummary } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: "root",
})
export class TimesheetAggregatorService {
  constructor(private dateTimeService: DateTimeService) {}

  groupByTimePeriod(period: TimePeriods, t: Timesheet[]): TimesheetSummary[] {
    switch (period) {
      case TimePeriods.Day:
        return this.groupByDay(t);
      case TimePeriods.Week:
        return this.groupByWeek(t);
      case TimePeriods.Month:
        return this.groupByMonth(t);
      case TimePeriods.Year:
        return this.groupByYear(t);
    }
  }

  groupByDay(t: Timesheet[]): TimesheetSummary[] {
    console.time("grping");
    const obj_arr = t.reduce((groups, timesheet) => {
      const date = timesheet.startTime.toString().split("T")[0];
      const index = date + "-" + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          date,
          totalHours: 0,
          timesheets: [],
        };
      }

      groups[index].totalHours += timesheet.totalHours;
      groups[index].timesheets.push(timesheet);

      return groups;
    }, {});

    let result = [];
    Object.keys(obj_arr).forEach((x) => result.push(obj_arr[x]));
    return result;
  }

  groupByWeek(t: Timesheet[]): TimesheetSummary[] {
    console.time("grping");
    const obj_arr = t.reduce((groups, timesheet) => {
      const date = new Date(timesheet.startTime);
      const weekNr = this.dateTimeService.getWeekOfYear(date);
      const year = date.getFullYear();
      const index = year + "-" + weekNr + "-" + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          weekNr,
          totalHours: 0,
          timesheets: [],
        };
      }

      groups[index].totalHours += timesheet.totalHours;
      groups[index].timesheets.push(timesheet);

      return groups;
    }, []);

    let result = [];
    Object.keys(obj_arr).forEach((x) => result.push(obj_arr[x]));
    return result;
  }

  groupByWeekRange(timesheets: Timesheet[],startWeek: number, endWeek: number, year: number, excludeStatus?: TimesheetStatus): TimesheetSummary[] {
    const obj_arr = timesheets.reduce((groups, timesheet) => {
      if(timesheet.status == excludeStatus) return groups;
      const date = new Date(timesheet.startTime);
      if(date.getFullYear() !== year) return groups;
      const weekNr = this.dateTimeService.getWeekOfYear(date);
      if (weekNr >= startWeek && weekNr <= endWeek) {
        if (!groups[weekNr])
          groups[weekNr] = { week: weekNr,timesheets: [],totalHours: 0,openHours: 0,confirmedHours: 0,} as TimesheetSummary;

        groups[weekNr].timesheets.push(timesheet);
        groups[weekNr].totalHours += timesheet.totalHours;

        if (timesheet.status == TimesheetStatus.Open)
          groups[weekNr].openHours += timesheet.totalHours;
        else if (timesheet.status == TimesheetStatus.Confirmed)
          groups[weekNr].confirmedHours += timesheet.totalHours;
      }
      return groups;
    }, {});

    let result = [];
    Object.keys(obj_arr).forEach((x) => result.push(obj_arr[x]));
    return result;
  }

  groupByMonth(t: Timesheet[]): TimesheetSummary[] {
    console.time("grping");
    const obj_arr = t.reduce((groups, timesheet) => {
      const month = new Date(timesheet.startTime).getMonth();
      const year = new Date(timesheet.startTime).getFullYear();
      const index = year + "-" + month + "-" + timesheet.userName;
      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          month,
          totalHours: 0,
          timesheets: [],
        };
      }

      groups[index].totalHours += timesheet.totalHours;
      groups[index].timesheets.push(timesheet);

      return groups;
    }, []);

    let result = [];
    Object.keys(obj_arr).forEach((x) => result.push(obj_arr[x]));
    return result;
  }

  groupByYear(t: Timesheet[]): TimesheetSummary[] {
    console.time("grping");
    const obj_arr = t.reduce((groups, timesheet) => {
      const year = new Date(timesheet.startTime).getFullYear();
      const index = year + "-" + timesheet.userName;

      if (!groups[index]) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          totalHours: 0,
          timesheets: [],
        };
      }

      groups[index].totalHours += timesheet.totalHours;
      groups[index].timesheets.push(timesheet);

      return groups;
    }, []);

    let result = [];
    Object.keys(obj_arr).forEach((x) => result.push(obj_arr[x]));
    return result;
  }


}
