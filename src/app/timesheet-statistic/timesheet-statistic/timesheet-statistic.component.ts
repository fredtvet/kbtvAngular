import { Component } from '@angular/core';
import { MainNavService, TimesheetService, UsersService } from 'src/app/core/services';
import { filter, tap, map } from 'rxjs/operators';
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared/components';
import { TimesheetFilter } from 'src/app/shared/interfaces';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { GroupByTypes } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',
  styleUrls: ['./timesheet-statistic.component.scss']
})
export class TimesheetStatisticComponent {
  groupByTypes = GroupByTypes;

  filter$ = this.timesheetService.filter$;

  groupBy$ = this.timesheetService.groupBy$;

  timesheetSummaries$ = this.timesheetService.timesheetSummaries$;

  users$ = this.usersService.getAll$();

  constructor(
    private usersService: UsersService,
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
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Timestatistikk";
    this.mainNavService.addConfig(cfg);
  }
}
