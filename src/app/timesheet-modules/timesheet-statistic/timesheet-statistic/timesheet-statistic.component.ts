import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map } from 'rxjs/operators';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService } from 'src/app/layout';
import { SubscriptionComponent } from 'src/app/shared-app/components/subscription.component';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
import { TimesheetFilter } from 'src/app/shared-timesheet/timesheet-filter.model';
import { BottomSheetMenuComponent, MainTopNavComponent } from 'src/app/shared/components';
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetStatisticStore } from '../timesheet-statistic.store';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent extends SubscriptionComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  groupByTypes = GroupByPeriod;

  groupBy$ = this.store.groupBy$;
  tableData$ = this.store.tableData$;
  activeCriteriaCount$ = this.store.criteria$.pipe(
    map(x => new TimesheetFilter(x).activeCriteriaCount)
  );

  constructor(
    private mainNavService: MainNavService,
    private store: TimesheetStatisticStore,
    private matBottomSheet: MatBottomSheet,
    private filterService: FilterSheetService
    ) { super(); }

  ngOnInit(): void {
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
  
  private openBottomSheetMenu = () => {   
    this.matBottomSheet.open(BottomSheetMenuComponent, { data: [
      {icon: "import_export", text: "Eksporter timer til CSV", callback: this.exportAsCsv}
    ]});
  }

  private configureMainNav(){
    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Timestatistikk",
        buttons: [{icon: "more_vert", callback: this.openBottomSheetMenu}]
      }
    });
  }
}
