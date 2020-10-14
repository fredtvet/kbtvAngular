import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ValueFormatterParams } from 'ag-grid-community';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { GroupByPeriod } from 'src/app/shared/enums';
import { ArrayRow } from 'src/app/shared/interfaces/array-row.interface';
import { _trackById } from 'src/app/shared/trackby/track-by-id.helper';
import { TimesheetStatisticStore } from '../timesheet-statistic.store';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

interface ViewModel { tableConfig: AgGridConfig<TimesheetSummary | Timesheet>, chipRows: ArrayRow<AppChip>[],  navConfig?: MainTopNavConfig }

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  private navVm$: Observable<Partial<ViewModel>> = this.store.criteria$.pipe(map(criteria => { 
    const activeCriteriaCount = _getSetPropCount(criteria, {dateRangePreset: null})
    return {
      chipRows: [this.getCriteriaChips(criteria, activeCriteriaCount)], 
      navConfig: this.getNavConfig(activeCriteriaCount)
    }
  }))

  vm$: Observable<ViewModel> = combineLatest([
    this.store.filteredAndGroupedTimesheets$.pipe(map(x => { return {data: x.records} })),
    this.store.groupBy$.pipe(map(x => this.getGroupByChips(x))),
    this.navVm$
  ]).pipe(debounceTime(1),
    map(([tableConfig, groupByChips, navVm]) => {
      const chipRows = [groupByChips, ...navVm.chipRows];
      return {...navVm, tableConfig, chipRows}
    }), 
  )
  
  constructor( 
    private store: TimesheetStatisticStore,
    private filterService: FilterSheetService,
    private chipsFactory: ChipsFactoryService
  ) { }
  
  openBottomSheet = (): void => {
    this.filterService.open<TimesheetCriteria, FilterConfig<TimesheetFilterViewConfig>>({formConfig: {
      filterConfig: {disabledFilters: ['status']},
      viewComponent: TimesheetFilterViewComponent     
    }});
  }

  trackByChipRow = _trackById;

  private resetCriteriaProp(prop: string, criteria: TimesheetCriteria){
    criteria[prop] = null;
    this.store.addFilterCriteria(criteria);
  }

  private exportAsCsv = () => {
    this.statTable.dataGrid.api.exportDataAsCsv({
      processCellCallback: (params) => {
        const colDef = params.column.getColDef()
        // Use coldef value formatter in export
        if (colDef.valueFormatter instanceof Function) {
          const valueFormatterParams: ValueFormatterParams = {
            ...params,
            data: params.node.data,
            node: params.node!,
            colDef: params.column.getColDef()
          };
          return colDef.valueFormatter(valueFormatterParams);
        }
        return params.value;
      }
    });
  }

  private addGroupBy = (groupBy: GroupByPeriod) => this.store.addGroupBy(groupBy);

  private getNavConfig(activeCriteriaCount: number): MainTopNavConfig {
    return { title:  "Timestatistikk",
      buttons: [
        {icon: "filter_list", color: activeCriteriaCount && activeCriteriaCount > 0 ? "accent" : null, 
          callback: this.openBottomSheet},
        {icon: "cloud_download", callback: this.exportAsCsv}     
      ]
    }
  }

  private getGroupByChips(groupBy: GroupByPeriod): ArrayRow<AppChip> {
    return {id: 1, arr: this.chipsFactory.createEnumSelectionChips(GroupByPeriod, groupBy, this.addGroupBy)};
  }

  private getCriteriaChips(criteria: TimesheetCriteria, activeCriteriaCount: number): ArrayRow<AppChip> {
    if(activeCriteriaCount === 0) 
      return {id: 2, arr: [{text: "Åpne filter", color:"accent", onClick: this.openBottomSheet}]}
  
    return {id: 3, 
      arr: this.chipsFactory.createFilterChips(
        this.formatCriteriaChips(criteria), 
        (prop) => this.resetCriteriaProp(prop, criteria)
      )
    } 
  }

  private formatCriteriaChips(criteria: TimesheetCriteria){
    const clone = {...criteria};
    if(clone.user)
      clone.user = clone.user.lastName + ', ' + clone.user.firstName as any
   return clone
  }

}
