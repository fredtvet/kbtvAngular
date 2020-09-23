import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService } from 'src/app/layout';
import { SubscriptionComponent } from 'src/app/shared-app/components/subscription.component';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { MainTopNavComponent } from 'src/app/shared/components';
import { GroupByPeriod } from 'src/app/shared/enums';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

@Component({
  selector: 'app-user-timesheet-week-list',
  templateUrl: './user-timesheet-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekListComponent extends SubscriptionComponent implements OnInit {

  summaries$ = this.store.timesheetSummaries$.pipe(map(arr => arr.sort((a,b) => b.week - a.week)));

  constructor(
    private filterService: FilterSheetService,
    private store: UserTimesheetListStore,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router) 
    { super(); this.store.addGroupBy(GroupByPeriod.Week)}

  ngOnInit() {
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: new Date().getFullYear()};
    this.store.addWeekFilterCriteria(initFilter);

    this.store.criteria$.pipe(takeUntil(this.unsubscribe))
      .subscribe(x => this.configureMainNav(this.store.weekCriteria?.year))
  }

  goToWeekView = (year: number, weekNr: number) => {
    this.router.navigate(['/mine-timer/ukevisning', {initialFilter: JSON.stringify({year, weekNr})}])
  }

  trackByWeekNr(index:number, summary:TimesheetSummary): number {
    return summary.week;
  } 

  openWeekFilter = () => { 
    let ref = this.filterService.open<WeekCriteria, WeekFilterViewConfig>({
      formConfig: {
        criteria: this.store.weekCriteria, 
        disabledFilters: ["weekNr","userName"]
      },
      formComponent: WeekFilterViewComponent
    });

    ref.afterDismissed()
      .pipe(filter(f => f != null))
      .subscribe(f => this.store.addWeekFilterCriteria(f));
  }

  private configureMainNav = (year: number) => {   
    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Ukeliste", 
        subTitle: year ? year.toString() : "",
        buttons: [{
          icon: 'filter_list', 
          callback: this.openWeekFilter,
          colorClass: "color-accent"
        }]
      }
    });
  }
}
