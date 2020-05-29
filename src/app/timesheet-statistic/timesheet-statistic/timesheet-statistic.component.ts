import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService, TimesheetService, UserService } from 'src/app/core/services';
import { filter } from 'rxjs/operators';
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared/components';
import { TimesheetFilter, TopDefaultNavConfig } from 'src/app/shared/interfaces';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { GroupByTypes } from 'src/app/shared/enums';

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
  users$ = this.userService.getAll$();

  constructor(
    private userService: UserService,
    private mainNavService: MainNavService,
    private timesheetService: TimesheetService,
    private _bottomSheet: MatBottomSheet,
    ) { 
      this.configureMainNav();
    }

  changeGroupingType = (type: GroupByTypes) => this.timesheetService.addGroupBy(type);
  
  openBottomSheet(f: TimesheetFilter): void {
    let ref = this._bottomSheet.open(TimesheetFilterSheetWrapperComponent, {
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
