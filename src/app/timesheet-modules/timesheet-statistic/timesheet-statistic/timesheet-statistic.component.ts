import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';
import { MainNavService } from 'src/app/core/services';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components/timesheet-filter/timesheet-filter-sheet-wrapper.component';
import { TimesheetStatisticStore } from '../timesheet-statistic.store';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  groupByTypes = GroupByPeriod;

  groupBy$ = this.store.groupBy$;
  timesheetSummaries$ = this.store.timesheetSummaries$;

  constructor(
    private mainNavService: MainNavService,
    private store: TimesheetStatisticStore,
    private bottomSheet: MatBottomSheet
    ) { 
      this.configureMainNav();
    }
    
  changeGroupingType = (type: GroupByPeriod) => this.store.addGroupBy(type);
  
  openBottomSheet(): void {
    let ref = this.bottomSheet.open(TimesheetFilterSheetWrapperComponent, {
      data: {
        filter: this.store.criteria, 
        disabledFilters: ['status'], 
        missions: this.store.filteredMissions, 
        users: this.store.getProperty("users")
      }
    });

    ref.afterDismissed()
      .pipe(filter(x => x != null))
      .subscribe(x => this.store.addCriteria(x));
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
