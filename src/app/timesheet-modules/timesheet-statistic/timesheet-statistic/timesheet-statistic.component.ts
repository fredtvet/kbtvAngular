import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MainNavService, TimesheetService } from 'src/app/core/services';
import { TopDefaultNavConfig, TimesheetFilter} from 'src/app/shared-app/interfaces';
import { GroupByTypes } from 'src/app/shared-app/enums';
import { TimesheetFilterSheetWrapperComponent } from '../../shared-timesheet/components/timesheet-filter-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, tap } from 'rxjs/operators';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

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

  private exportAsCsv = () => {
    this.statTable.dataGrid.api.exportDataAsCsv({
      processCellCallback: (cell) => {
        if(cell.column.getColId() === "month" && cell.value) return cell.value + 1;
        return cell.value
      }
    });
  }

  private configureMainNav(){
    let cfg = {
      title:  "Timestatistikk",
      bottomSheetButtons: [{icon: "import_export", text: "Eksporter timer til CSV", callback: this.exportAsCsv}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }
}
