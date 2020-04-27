import { Component, OnInit } from '@angular/core';
import { DateTimeService, MainNavService } from 'src/app/core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppButton } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from './week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html'
})
export class TimesheetWeekListComponent implements OnInit {

  weeks: number[] = [];

  today = new Date();

  weekNr: number = this.dateTimeService.getWeekOfYear(this.today);
  year: number = this.today.getFullYear();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dateTimeService: DateTimeService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router) 
    { this.configureMainNav(+this.route.snapshot.paramMap.get('year')) }

  ngOnInit() {
    this.route.paramMap
      .subscribe(pm =>{       
        this.year = +pm.get('year') || this.today.getFullYear();
        let endWeek = (this.year == this.today.getFullYear()) ? this.weekNr : this.dateTimeService.getWeeksInYear(this.year)
        this.weeks = this.createWeeksArray(1, endWeek);  
        this.configureMainNav(this.year);  
      });  
  }

  private createWeeksArray(startWeek: number, endWeek: number): number[]{
    const weeks = [];
    for(let n = endWeek; n >= startWeek; n--){
      weeks.push(n);
    }
    return [...weeks];
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: this.year}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateYear(f.year));
  }

  private updateYear = (year: number) => this.router.navigate(['timer', year, 'ukeliste'])

  private configureMainNav(year: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Ukeliste";
    cfg.subTitle = year.toString();
    cfg.buttons = [{icon: 'filter_list', callback: this.openWeekFilter} as AppButton]
    //cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }
}
