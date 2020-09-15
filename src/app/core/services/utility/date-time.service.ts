import { Injectable } from "@angular/core";
import { DateRangePresets } from 'src/app/shared-app/enums';
import { DateParams } from 'src/app/shared-app/interfaces';

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
      default: return undefined;
    }
  }

  getWeekRange(date: Date = this.currentDate): Date[] {
    var range = [];
    range.push(this.getFirstDayOfWeek(date));
    range.push(this.getLastDayOfWeek(date));
    return range;
  }

  getWeekRangeByDateParams(dateParams: DateParams): Date[] {
    return this.getWeekRange(this.getDateOfWeek(dateParams.weekNr, dateParams.year));
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

  getFirstDayOfMonth(date: Date | string = this.currentDate): Date  {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  getLastDayOfMonth(date: Date | string = this.currentDate): Date  {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }

  getFirstDayOfYear(date: Date | string = this.currentDate): Date  {
    return new Date(new Date(date).getFullYear(), 0, 1);
  }

  getLastDayOfYear(date: Date | string = this.currentDate): Date {
    return new Date(new Date(date).getFullYear(), 11, 31, 23, 59, 59);
  }

  getWeekOfYear(date: Date | string = this.currentDate): number {
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d.getTime() - new Date(d.getFullYear(),0,1).getTime())/8.64e7)+1)/7);
  }

  getWeekAndYearFromString(date: Date | string = this.currentDate): {week: number, year: number} {
    var d = new Date(date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    let year = d.getFullYear();
    let week = Math.ceil((((d.getTime() - new Date(year,0,1).getTime())/8.64e7)+1)/7);
    return {week, year}
  }
  
  getWeeksInYear(year: number): number{
    let d = new Date(year, 0, 1);
    let isLeap = new Date(year, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }

  getDateOfWeek(weekNr: number, year: number) {
    var d = (1 + (weekNr - 1) * 7); // 1st of January + 7 days for each week

    return new Date(year, 0, d);
  }
  
  getNowInUnixTimeSeconds(){
      var date = new Date();
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()) / 1000;
  }

  mapObjectsToWeekdays<TObject>(objects: TObject[], dateProp: string): { [key: number]: TObject }{
    const result: { [key: number]: TObject } = {};
    for(let i = 0; i < objects.length; i++){
      const obj = objects[i];
      result[new Date(obj[dateProp]).getDay() || 7] = obj;
    }
    return result;
  }

}
