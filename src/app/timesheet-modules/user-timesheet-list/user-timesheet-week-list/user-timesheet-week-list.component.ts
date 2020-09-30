import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { ViewModel } from 'src/app/shared/interfaces/view-model.interface';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

@Component({
  selector: 'app-user-timesheet-week-list',
  templateUrl: './user-timesheet-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekListComponent implements OnInit {

  vm$: Observable<ViewModel<TimesheetSummary[]>> = this.store.timesheetSummaries$.pipe(
    map(arr => { return {
      navConfig: this.getTopNavConfig(),
      content: arr.sort((a,b) => b.week - a.week)
    }})
  );

  constructor(
    private filterService: FilterSheetService,
    private store: UserTimesheetListStore,
    private route: ActivatedRoute,
    private router: Router) 
    { this.store.addGroupBy(GroupByPeriod.Week)}

  ngOnInit() {
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: new Date().getFullYear()};
    this.store.addWeekFilterCriteria(initFilter);
  }

  goToWeekView = (year: number, weekNr: number) => {
    this.router.navigate(['/mine-timer/ukevisning', {initialFilter: JSON.stringify({year, weekNr})}])
  }

  trackByWeekNr(summary:TimesheetSummary): number {
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

  private getTopNavConfig = (): MainTopNavConfig => {  
    const year = this.store.weekCriteria?.year; 
    return {
      title:  "Ukeliste", 
      subTitle: year ? year.toString() : "",
      buttons: [{
        icon: 'filter_list', 
        callback: this.openWeekFilter,
        colorClass: "color-accent"
      }]
    }
  }
}
