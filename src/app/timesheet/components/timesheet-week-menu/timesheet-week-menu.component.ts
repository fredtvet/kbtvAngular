import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { DateParams } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-week-menu',
  templateUrl: './timesheet-week-menu.component.html',
  styleUrls: ['./timesheet-week-menu.component.scss'],
  encapsulation : ViewEncapsulation.None,
})

export class TimesheetWeekMenuComponent implements OnInit {

  @Input() dateParams: DateParams;
  @Output() dateParamsChanged = new EventEmitter();
  @Output() allTimesheetsConfirmed = new EventEmitter();

  totalWeeks: number;
  visibleWeeks: number[];
  currentPage: number = 0;

  //Helpers for week picker
  screenWidth: number;
  weekItemWidth: number = 36;
  chevronWidth: number = 40;

  constructor() {}

  ngOnInit() {
    this.setWeeksPerYear(this.dateParams.year);
  }

  changeWeek(week: number){
    if(week > this.totalWeeks) this.dateParams.weekNr = this.totalWeeks;
    else if(week < 1) this.dateParams.weekNr = 1;
    else this.dateParams.weekNr = week;
    this.dateParamsChanged.emit(this.dateParams)
  }

  changeYear(year: number){
    if(year < 2000) this.dateParams.year = 2000;
    if(year > moment().year()) this.dateParams.year = moment().year();
    else this.dateParams.year = year;
    this.dateParamsChanged.emit(this.dateParams);

    this.setWeeksPerYear(this.dateParams.year);
    this.checkWeekNr(this.dateParams);
  }

  //Check if current week is higher that total weeks, if so set to latest week.
  //Incase new year has less weeks & current week is too high
  private checkWeekNr(dateParams: DateParams): any{
    if(dateParams.weekNr > this.totalWeeks) dateParams.weekNr = this.totalWeeks;
    return dateParams;
  }

  private setWeeksPerYear(year: number): void{
    this.totalWeeks = moment(year.toString().concat("-12-28")).weeks();
  }
}
