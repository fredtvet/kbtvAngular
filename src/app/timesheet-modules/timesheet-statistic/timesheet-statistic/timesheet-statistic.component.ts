import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { FilteredAndGroupedSummaries } from 'src/app/shared-timesheet/base-timesheet-store/base-timesheet-store';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
import { GroupByPeriod } from 'src/app/shared/enums';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';
import { TimesheetStatisticStore } from '../timesheet-statistic.store';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

interface ViewModel extends BaseViewModel { summaries: FilteredAndGroupedSummaries }

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  vm$: Observable<ViewModel> = this.store.timesheetSummaries$.pipe(map(x => {
    const activeCriteriaCount = _getSetPropCount(x.criteria, {dateRangePreset: false})
    return {summaries: x, 
      navConfig: {
        title:  "Timestatistikk",
        buttons: [
          {icon: "filter_list", colorClass: activeCriteriaCount && activeCriteriaCount > 0 ? "color-accent" : "", 
            callback: this.openBottomSheet},
          {icon: "cloud_download", callback: this.exportAsCsv}     
        ]
      },
      chipRows: [ 
        {id: 1, arr: this.chipsFactory.createEnumSelectionChips(GroupByPeriod, x.groupBy, this.addGroupBy)},
        {id: 1, arr: activeCriteriaCount > 0 ? 
          this.chipsFactory.createFilterChips(
            this.formatCriteriaChips(x.criteria), 
            (prop) => this.resetCriteriaProp(prop, x.criteria)
          ) 
          : [{text: "Åpne filter", color:"accent", onClick: this.openBottomSheet}]}
      ]
    }
   
  }));
  
  constructor( 
    private store: TimesheetStatisticStore,
    private filterService: FilterSheetService,
    private chipsFactory: ChipsFactoryService,
  ) { }
  
  openBottomSheet = (): void => {
    this.filterService.open<TimesheetCriteria, FilterConfig<TimesheetFilterViewConfig>>({formConfig: {
      filterConfig: {disabledFilters: ['status']},
      viewComponent: TimesheetFilterViewComponent     
    }});
  }

  private resetCriteriaProp(prop: string, criteria: TimesheetCriteria){
    criteria[prop] = null;
    this.store.addFilterCriteria(criteria);
  }

  private exportAsCsv = () => {
    this.statTable.dataGrid.api.exportDataAsCsv({
      processCellCallback: (cell) => {
        if(cell.column.getColId() === "month" && cell.value) return cell.value + 1;
        return cell.value
      }
    });
  }

  private formatCriteriaChips(criteria: TimesheetCriteria){
    const clone = {...criteria};
    if(clone.user)
      clone.user = clone.user.lastName + ', ' + clone.user.firstName as any
   return clone
  }

  private addGroupBy = (groupBy: GroupByPeriod) => this.store.addGroupBy(groupBy);
}
