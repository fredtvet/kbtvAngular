import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DateParams, AppButton } from 'src/app/shared/interfaces';
import { DateTimeService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-week-menu',
  templateUrl: './timesheet-week-menu.component.html',
  styleUrls: ['./timesheet-week-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetWeekMenuComponent implements OnInit {

  @Input() dateParams: DateParams;
  @Output() dateParamsChanged = new EventEmitter();
  @Output() allTimesheetsConfirmed = new EventEmitter();

  totalWeeks: number;
  now: Date;

  confirmBtnConfig: AppButton;

  constructor(private dateTimeService: DateTimeService) { this.configureConfirmAll() }

  ngOnInit() {
    this.now = new Date();
    this.setWeeksPerYear(this.dateParams.year);
  }

  changeWeek(week: number){
    const dateParams = {...this.dateParams};
    if(week > this.totalWeeks) dateParams.weekNr = this.totalWeeks;
    else if(week < 1) dateParams.weekNr = 1;
    else dateParams.weekNr = week;
    this.dateParamsChanged.emit(dateParams);
  }

  changeYear(year: number){
    const dateParams = {...this.dateParams};

    if(year < 2000) dateParams.year = 2000;
    if(year > this.now.getFullYear()) dateParams.year = this.now.getFullYear();
    else dateParams.year = year;

    this.setWeeksPerYear(dateParams.year);
    dateParams.weekNr = this.checkWeekNr(dateParams.weekNr);

    this.dateParamsChanged.emit(dateParams);
  }

  //Check if current week is higher that total weeks, if so set to latest week.
  //Incase new year has less weeks & current week is too high
  private checkWeekNr(weekNr): number{
    if(weekNr > this.totalWeeks) return this.totalWeeks;
    return weekNr;
  }

  private setWeeksPerYear(year: number): void{
    this.totalWeeks = this.dateTimeService.getWeeksInYear(year);
  }

  private confirmAllTimesheets = () => this.allTimesheetsConfirmed.emit();

  private configureConfirmAll(){
    this.confirmBtnConfig = {
        colorClass: "color-accent",
        text: 'Bekreft alle', 
        aria: 'Bekreft alle',
        callback: this.confirmAllTimesheets,
      }
    
  }
}