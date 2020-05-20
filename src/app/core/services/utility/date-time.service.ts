import { Injectable } from "@angular/core";
import { DateRangePresets } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: "root"
})

export class DateTimeService {
  private currentDate = new Date();

  constructor() {
    this.currentDate.setHours(0, 0, 0, 0);
  }

  getRangeByDateRangePreset(preset: DateRangePresets): Date[] {
    switch (preset) {
      case DateRangePresets.CurrentWeek:
        return this.getWeekRange();
      case DateRangePresets.CurrentMonth:
        return this.getMonthRange();
      case DateRangePresets.CurrentYear:
        return this.getYearRange();
    }
  }

  getWeekRange(date: Date = this.currentDate): Date[] {
    var range = [];
    range.push(this.getFirstDayOfWeek(date));
    range.push(this.getLastDayOfWeek(date));
    return range;
  }

  getWeekRangeByDateParams(dateParams: DateParams): Date[] {
    var d = new Date("Jan 01, " + dateParams.year + " 01:00:00");
    var w = d.getTime() + 604800000 * (dateParams.weekNr - 1);
    return this.getWeekRange(new Date(w));
  }

  getMonthRange(date: Date = this.currentDate): Date[] {
    var range = [];
    range.push(this.getFirstDayOfMonth(date));
    range.push(this.getLastDayOfMonth(date));
    return range;
  }

  getYearRange(date: Date = this.currentDate): Date[] {
    var range = [];
    range.push(this.getFirstDayOfYear(date));
    range.push(this.getLastDayOfYear(date));
    return range;
  }

  getFirstDayOfWeek(date: Date = this.currentDate): Date  {
    let day = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (day == 0 ? -6 : 1) - day
    );
  }

  getLastDayOfWeek(date: Date = this.currentDate): Date  {
    let day = date.getDay();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (day == 0 ? 0 : 7) - day,
      23,59,59
    );
  }

  getFirstDayOfMonth(date: Date = this.currentDate): Date  {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getLastDayOfMonth(date: Date = this.currentDate): Date  {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getFirstDayOfYear(date: Date = this.currentDate): Date  {
    return new Date(date.getFullYear(), 0, 1);
  }

  getLastDayOfYear(date: Date = this.currentDate): Date {
    return new Date(date.getFullYear(), 11, 31);
  }

  getWeekOfYear(date: Date = this.currentDate): number {
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d.getTime() - new Date(d.getFullYear(),0,1).getTime())/8.64e7)+1)/7);
  }

  getWeeksInYear(year: number): number{
    let d = new Date(year, 0, 1);
    let isLeap = new Date(year, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }

  getNDaysAgo(n: number): number {
    return new Date().setDate(this.currentDate.getDate() - n);
  }
}
