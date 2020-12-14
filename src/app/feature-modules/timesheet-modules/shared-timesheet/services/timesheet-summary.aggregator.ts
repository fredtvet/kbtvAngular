import { Injectable } from '@angular/core';
import { Timesheet } from '@core/models';
import { GroupByPeriod } from '@shared/enums/group-by-period.enum';
import { TimesheetStatus } from '@shared/enums/timesheet-status.enum';
import { _getWeekAndYearFromDate } from '@datetime/get-week-and-year-from-date.helper';
import { _getWeekOfYear } from '@datetime/get-week-of-year.helper';
import { TimesheetSummary } from '../interfaces/timesheet-summary.interface';
import { Immutable, ImmutableArray } from '@immutable/interfaces';

@Injectable({providedIn: "root"})
export class TimesheetSummaryAggregator {
  constructor() {}

  groupByType(type: GroupByPeriod, t: ImmutableArray<Timesheet>): Immutable<TimesheetSummary>[] {
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

  groupByDay(t: ImmutableArray<Timesheet>): Immutable<TimesheetSummary>[] {
    if(!t) return undefined;
    const groups = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const date = new Date(timesheet.startTime);
      const index = date.toDateString() + "-" + timesheet.userName;
      let summary = groups[index];
      if(summary === undefined) {
        groups[index] = {
          userName: timesheet.userName,
          date,
          openHours: 0,
          confirmedHours: 0,
          timesheets: [],
        };
        summary = groups[index];  
      }

      this.addHoursToSummary(summary, timesheet)

      summary.timesheets.push(timesheet);
    }

    return <TimesheetSummary[]> Object.values(groups); 
  }

  groupByWeek(t: ImmutableArray<Timesheet>): Immutable<TimesheetSummary>[] {
    if(!t) return undefined;
    const groups = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const wy = _getWeekAndYearFromDate(timesheet.startTime);
      const index = wy.year + "-" + wy.weekNr + "-" + timesheet.userName;
      let summary = groups[index];
      if (summary === undefined) {
        groups[index] = {
          userName: timesheet.userName,
          year: wy.year,
          weekNr: wy.weekNr,
          openHours: 0,
          confirmedHours: 0,
          timesheets: [],
        };
        summary = groups[index];
      }  

      this.addHoursToSummary(summary, timesheet)

      summary.timesheets.push(timesheet);
    }

    return <TimesheetSummary[]> Object.values(groups);
  }

  groupByWeekRange(
    t: ImmutableArray<Timesheet>,
    startWeek: number, endWeek: number, year: number, 
    excludeStatus?: TimesheetStatus): Immutable<TimesheetSummary>[] {
    if(!t) return undefined;
    const groups = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      if(timesheet.status === excludeStatus) continue;
      const date = new Date(timesheet.startTime);
      if(date.getFullYear() !== year) continue;
      const weekNr = _getWeekOfYear(date);
      if (weekNr >= startWeek && weekNr <= endWeek) {
        let summary = groups[weekNr];
        if (summary === undefined){
          groups[weekNr] = 
            {weekNr, timesheets: [],openHours: 0,confirmedHours: 0,};    
          summary = groups[weekNr];  
        }

        this.addHoursToSummary(summary, timesheet)

        summary.timesheets.push(timesheet);
      }
    };

    return <TimesheetSummary[]> Object.values(groups);
  }

  groupByMonth(t: ImmutableArray<Timesheet>): Immutable<TimesheetSummary>[] {
    if(!t) return undefined;
    const groups = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const date = new Date(timesheet.startTime);
      const month = date.getMonth();
      const year = date.getFullYear();
      const index = year + "-" + month + "-" + timesheet.userName;
      let summary = groups[index];

      if (summary === undefined) {
        groups[index] = {
          userName: timesheet.userName,
          year,
          month,
          openHours: 0, confirmedHours: 0,
          timesheets: [],
        };
        summary = groups[index];
      }

      this.addHoursToSummary(summary, timesheet)

      summary.timesheets.push(timesheet);
    };

    return <TimesheetSummary[]> Object.values(groups);
  }

  groupByYear(t: ImmutableArray<Timesheet>): Immutable<TimesheetSummary>[] {
    if(!t) return undefined;
    const groups = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const year = new Date(timesheet.startTime).getFullYear();
      const index = year + "-" + timesheet.userName;

      let summary = groups[index];

      if (summary === undefined) {
        groups[index] = {
          userName: timesheet.userName, year, 
          openHours: 0, confirmedHours: 0, timesheets: [],
        };
        summary = groups[index];
      }

      this.addHoursToSummary(summary, timesheet)

      summary.timesheets.push(timesheet);
    };
    return <TimesheetSummary[]> Object.values(groups);
  }

  private addHoursToSummary(summary: TimesheetSummary, timesheet: Immutable<Timesheet>): void{
    if (timesheet.status === TimesheetStatus.Confirmed)
      summary.confirmedHours = Math.round((summary.confirmedHours + timesheet.totalHours) * 10) / 10;
    else   
      summary.openHours = Math.round((summary.openHours + timesheet.totalHours) * 10) / 10;
  }

}
