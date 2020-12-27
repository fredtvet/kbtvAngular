import { Injectable } from '@angular/core';
import { Timesheet } from '@core/models';
import { GroupByPeriod } from '@shared/enums/group-by-period.enum';
import { TimesheetStatus } from '@shared/enums/timesheet-status.enum';
import { _getWeekAndYearFromDate } from '@datetime/get-week-and-year-from-date.helper';
import { _getWeekOfYear } from '@datetime/get-week-of-year.helper';
import { TimesheetSummary } from '../interfaces/timesheet-summary.interface';
import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';

@Injectable({providedIn: "root"})
export class TimesheetSummaryAggregator {
  constructor() {}

  groupByType(type: Maybe<GroupByPeriod>, t: Maybe<ImmutableArray<Timesheet>>): Maybe<Immutable<TimesheetSummary>[]> {
    switch (type) {
      case GroupByPeriod.Day:
        return this.groupByDay(t);
      case GroupByPeriod.Week:
        return this.groupByWeek(t);
      case GroupByPeriod.Month:
        return this.groupByMonth(t);
      case GroupByPeriod.Year:
        return this.groupByYear(t);
      default: return null;
    }
  }

  groupByDay(t: Maybe<ImmutableArray<Timesheet>>): Maybe<Immutable<TimesheetSummary>[]> {
    if(!t) return null;
    const groups: {[key:string]: TimesheetSummary} = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const date = timesheet.startTime ? new Date(timesheet.startTime) : new Date();
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

      summary.timesheets.push(<Timesheet> timesheet);
    }

    return <Immutable<TimesheetSummary>[]> Object.values(groups); 
  }

  groupByWeek(t: Maybe<ImmutableArray<Timesheet>>): Maybe<Immutable<TimesheetSummary>[]> {
    if(!t) return null;
    const groups: {[key:string]: TimesheetSummary} = {};
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

      summary.timesheets.push(<Timesheet> timesheet);
    }

    return <Immutable<TimesheetSummary>[]> Object.values(groups);
  }

  groupByWeekRange(
    t: Maybe<ImmutableArray<Timesheet>>,
    startWeek: number, endWeek: number, year: number, 
    excludeStatus?: TimesheetStatus): Maybe<Immutable<TimesheetSummary>[]> {
    if(!t) return null;
    const groups: {[key:string]: TimesheetSummary} = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      if(timesheet.status === excludeStatus) continue;
      const date = timesheet.startTime ? new Date(timesheet.startTime) : new Date();
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

        summary.timesheets.push(<Timesheet> timesheet);
      }
    };

    return <Immutable<TimesheetSummary>[]> Object.values(groups);
  }

  groupByMonth(t: Maybe<ImmutableArray<Timesheet>>): Maybe<Immutable<TimesheetSummary>[]> {
    if(!t) return null;
    const groups: {[key:string]: TimesheetSummary} = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const date = timesheet.startTime ? new Date(timesheet.startTime) : new Date();
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

      summary.timesheets.push(<Timesheet> timesheet);
    };

    return <Immutable<TimesheetSummary>[]> Object.values(groups);
  }

  groupByYear(t: Maybe<ImmutableArray<Timesheet>>): Maybe<Immutable<TimesheetSummary>[]> {
    if(!t) return null;
    const groups: {[key:string]: TimesheetSummary} = {};
    for(let i = t.length; i--;){
      const timesheet = t[i];
      const year = timesheet.startTime ? new Date(timesheet.startTime).getFullYear() : new Date().getFullYear();
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

      summary.timesheets.push(<Timesheet> timesheet);
    };
    return <Immutable<TimesheetSummary>[]> Object.values(groups);
  }

  private addHoursToSummary(summary: TimesheetSummary, timesheet: Immutable<Timesheet>): void{
    if(!timesheet) return;
    if (timesheet.status === TimesheetStatus.Confirmed)
      summary.confirmedHours = Math.round((summary.confirmedHours + <number> timesheet.totalHours) * 10) / 10;
    else   
      summary.openHours = Math.round((summary.openHours + <number> timesheet.totalHours) * 10) / 10;
  }

}
