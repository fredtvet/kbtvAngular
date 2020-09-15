import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
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
    private filterService: FilterSheetService
    ) { 
      this.configureMainNav();
    }
    
  changeGroupingType = (type: GroupByPeriod) => this.store.addGroupBy(type);
  
  openBottomSheet(): void {
    this.filterService.open<TimesheetCriteria, FilterConfig<TimesheetFilterViewConfig>>({formConfig: {
      filterConfig: {disabledFilters: ['status']},
      viewComponent: TimesheetFilterViewComponent     
    }});
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
