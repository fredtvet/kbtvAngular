import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';
import { FilterSheetService } from 'src/app/core/services/filter';
import { BottomSheetMenuService } from 'src/app/core/services/ui/bottom-sheet-menu.service';
import { FilteredAndGroupedSummaries } from 'src/app/shared-timesheet/base-timesheet-store/base-timesheet-store';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
import { GroupByPeriod } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
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

  navConfig: MainTopNavConfig;
  
  vm$: Observable<FilteredAndGroupedSummaries> = this.store.timesheetSummaries$;

  constructor( 
    private store: TimesheetStatisticStore,
    private menuService: BottomSheetMenuService,
    private filterService: FilterSheetService
    ) { 
    this.navConfig = {
      title:  "Timestatistikk",
      buttons: [{icon: "more_vert", callback: this.openBottomSheetMenu}]
    }
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

  private openBottomSheetMenu = () => {   
    this.menuService.open([
      {icon: "import_export", text: "Eksporter timer til CSV", callback: this.exportAsCsv}
    ]);
  }
}
