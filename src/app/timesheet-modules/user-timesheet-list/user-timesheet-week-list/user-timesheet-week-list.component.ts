import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DateTimeService, MainNavService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppButton, TimesheetSummary, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeekFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components';
import { UserTimesheetListStore } from '../user-timesheet-list.store';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { GroupByPeriod } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-user-timesheet-week-list',
  templateUrl: './user-timesheet-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekListComponent extends SubscriptionComponent implements OnInit {

  summaries$ = this.store.timesheetSummaries$.pipe(map(arr => arr.sort((a,b) => b.week - a.week)));

  constructor(
    private _bottomSheet: MatBottomSheet,
    private store: UserTimesheetListStore,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router) 
    { super(); this.store.addGroupBy(GroupByPeriod.Week)}

  ngOnInit() {
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: new Date().getFullYear()};
    this.store.addWeekFilter(initFilter);
    this.configureMainNav(initFilter?.year);
    this.store.criteria$.pipe(takeUntil(this.unsubscribe)).subscribe(x => this.configureMainNav(this.store.weekFilter?.year))
  }

  goToWeekView = (year: number, weekNr: number) => {
    this.router.navigate(['/mine-timer/ukevisning', {initialFilter: JSON.stringify({year, weekNr})}])
  }

  openWeekFilter = () => { 
    let ref = this._bottomSheet.open(WeekFilterSheetWrapperComponent, {
      data: {filter: this.store.weekFilter}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != null))
      .subscribe(f => this.store.addWeekFilter(f));
  }

  trackByWeekNr(index:number, summary:TimesheetSummary): number {
    return summary.week;
  }

  private configureMainNav = (year: number) => {
    let cfg:TopDefaultNavConfig = {title:  "Ukeliste", subTitle: year ? year.toString() : ""};

    cfg.buttons = [
      {icon: 'filter_list', colorClass:'color-accent', callback: this.openWeekFilter}
    ]

    this.mainNavService.addConfig({default: cfg});
  }
}
