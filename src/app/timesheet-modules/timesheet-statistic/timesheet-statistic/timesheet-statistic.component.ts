import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService, TimesheetService, UserService } from 'src/app/core/services';
import { TopDefaultNavConfig, TimesheetFilter } from 'src/app/shared-app/interfaces';
import { GroupByTypes } from 'src/app/shared-app/enums';
import { TimesheetFilterSheetWrapperComponent } from '../../shared-timesheet/components/timesheet-filter-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  groupByTypes = GroupByTypes;

  filter$ = this.timesheetService.filter$;
  groupBy$ = this.timesheetService.groupBy$;
  timesheetSummaries$ = this.timesheetService.timesheetSummaries$;

  constructor(
    private mainNavService: MainNavService,
    private timesheetService: TimesheetService,
    private bottomSheet: MatBottomSheet
    ) { 
      this.configureMainNav();
    }

  changeGroupingType = (type: GroupByTypes) => this.timesheetService.addGroupBy(type);
  
  openBottomSheet(f: TimesheetFilter): void {
    let ref = this.bottomSheet.open(TimesheetFilterSheetWrapperComponent, {
      data: {filter: f, disabledFilters: ['status']}
    });

    ref.afterDismissed()
      .pipe(filter(x => x !== null && x !== undefined))
      .subscribe(x => this.timesheetService.addFilter(x));
  }
  
  private configureMainNav(){
    let cfg = {title:  "Timestatistikk"} as TopDefaultNavConfig;
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}
