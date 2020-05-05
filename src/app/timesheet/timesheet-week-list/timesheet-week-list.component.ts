import { Component, OnInit } from '@angular/core';
import { DateTimeService, MainNavService, TimesheetService, UserTimesheetService } from 'src/app/core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppButton, TimesheetSummary, DateParams } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../../shared/components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html'
})
export class TimesheetWeekListComponent implements OnInit {

  weeks: number[] = [];

  today = new Date();

  weekNr: number = this.dateTimeService.getWeekOfYear(this.today);
  year: number = this.today.getFullYear();

  weekSummaries$: Observable<TimesheetSummary[]>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router) 
    { this.configureMainNav(+this.route.snapshot.queryParamMap['year']) }

  ngOnInit() {
    this.route.queryParams
      .subscribe(qp =>{        
        this.year = +qp['year'] || this.today.getFullYear();
        //Get all weeks up to current week if current year, else all weeks
        let endWeek = (this.year == this.today.getFullYear()) ? this.weekNr : this.dateTimeService.getWeeksInYear(this.year);
        this.weekSummaries$ = this.userTimesheetService.getByWeekRangeGrouped$(1, endWeek, this.year).pipe(map(x => x.reverse())); 
        this.configureMainNav(this.year);  
      });  
  }

  goToWeekView = (year: number, weekNr: number) => {
    console.log(year, weekNr);
    this.router.navigate(['/timer/ukevisning'], { queryParams: {year, weekNr}} )
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: this.year}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateYear(f.year));
  }

  private updateYear = (year: number) => this.router.navigate(['timer/ukeliste'], { queryParams: {year}})

  private configureMainNav(year: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Ukeliste";
    cfg.subTitle = year ? year.toString() : this.year.toString();
    cfg.buttons = [{icon: 'filter_list', callback: this.openWeekFilter} as AppButton]
    //cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }
}
