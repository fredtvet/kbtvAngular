import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DateTimeService, MainNavService, UserTimesheetService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppButton, TimesheetSummary } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../../shared/components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetWeekListComponent implements OnInit {
  today = new Date();

  weekNr: number = this.dateTimeService.getWeekOfYear(this.today);

  vm$: Observable<{year: number, summaries:TimesheetSummary[]}>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router) 
    { this.configureMainNav(+this.route.snapshot.queryParamMap['year']) }

  ngOnInit() {
    this.vm$ = this.route.queryParams.pipe(
      map(qp => +qp['year'] || this.today.getFullYear()),
      tap(this.configureMainNav),
      switchMap(year => {
        let endWeek = (year == this.today.getFullYear()) ? this.weekNr : this.dateTimeService.getWeeksInYear(year); 
        return this.userTimesheetService.getByWeekRangeGrouped$(1, endWeek, year).pipe(
          map(x => {return {year, summaries: x.reverse()}})
        );
      })
    )
  }

  goToWeekView = (year: number, weekNr: number) => {
    this.router.navigate(['/timer/ukevisning'], { queryParams: {year, weekNr}} )
  }

  trackByWeekNr(index:number, summary:TimesheetSummary): number {
    return summary.week;
  }

  private openWeekFilter = (year: number) => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateYear(f.year));
  }

  private updateYear = (year: number) => this.router.navigate(['timer/ukeliste'], { queryParams: {year}})

  private configureMainNav = (year: number) => {
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Ukeliste";
    cfg.subTitle = year ? year.toString() : this.today.getFullYear().toString();
    cfg.buttons = [{icon: 'filter_list', colorClass:'color-accent', callback: this.openWeekFilter, params:[year]} as AppButton]
    this.mainNavService.addConfig(cfg);
  }
}
