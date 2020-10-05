import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces/timesheet-criteria.interface';
import { GroupByPeriod } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { ArrayRow } from 'src/app/shared/interfaces/array-row.interface';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';
import { TimesheetStatisticStore } from '../timesheet-statistic.store';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

interface ViewModel extends BaseViewModel { data: TimesheetSummary[] }

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  private navVm$: Observable<BaseViewModel> = this.store.criteria$.pipe(map(criteria => { 
    console.log(criteria);
    const activeCriteriaCount = _getSetPropCount(criteria, {dateRangePreset: null})
    console.log(activeCriteriaCount);
    return {
      chipRows: [this.getCriteriaChips(criteria, activeCriteriaCount)], 
      navConfig: this.getNavConfig(activeCriteriaCount)
    }
  }))

  vm$: Observable<ViewModel> = combineLatest([
    this.store.timesheetSummaries$,
    this.store.groupBy$.pipe(map(x => this.getGroupByChips(x))),
    this.navVm$
  ]).pipe(
    map(([filtered, groupByChips, navVm]) => {
      const chipRows = [groupByChips, ...navVm.chipRows];
      return {data: filtered.records, ...navVm, chipRows}
    })
  )
  
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

  private addGroupBy = (groupBy: GroupByPeriod) => this.store.addGroupBy(groupBy);

  private getNavConfig(activeCriteriaCount: number): MainTopNavConfig {
    return { title:  "Timestatistikk",
      buttons: [
        {icon: "filter_list", colorClass: activeCriteriaCount && activeCriteriaCount > 0 ? "color-accent" : "", 
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
