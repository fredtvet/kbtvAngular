import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ValueFormatterParams } from 'ag-grid-community';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission, Timesheet, User } from 'src/app/core/models';
import { _getModelDisplayValue } from 'src/app/core/services/model/helpers/get-model-property.helper';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _formatDateRange } from 'src/app/shared-app/helpers/datetime/format-date-range.helper';
import { _formatShortDate } from 'src/app/shared-app/helpers/datetime/format-short-date.helper';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { _trackById } from 'src/app/shared-app/helpers/trackby/track-by-id.helper';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaFormState, TimesheetCriteriaForm } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod, TimesheetStatus } from 'src/app/shared/enums';
import { FormService } from 'src/app/shared/form';
import { ArrayRow } from 'src/app/shared/interfaces/array-row.interface';
import { DateRange } from 'src/app/shared/interfaces/date-range.interface';
import { translations } from 'src/app/shared/translations';
import { TimesheetSummary, TimesheetCriteria } from '../../shared-timesheet/interfaces';
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
  ]).pipe(
    map(([tableConfig, groupByChips, navVm]) => {
      const chipRows = [groupByChips, ...navVm.chipRows];
      return {...navVm, tableConfig, chipRows}
    }), 
  )
  
  constructor( 
    private store: TimesheetStatisticStore,
    private formService: FormService,
    private chipsFactory: ChipsFactoryService
  ) { }
  
  trackByChipRow = _trackById;

  private openTimesheetFilter = (): void => {
    this.formService.open<TimesheetCriteria, TimesheetCriteriaFormState>({
      formConfig: { ...TimesheetCriteriaForm, initialValue: this.store.getCriteria()}, 
      formState: this.store.criteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: TimesheetCriteria) => this.store.addFilterCriteria(val)
    })
  }

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
          callback: this.openTimesheetFilter},
        {icon: "cloud_download", callback: this.exportAsCsv}     
      ]
    }
  }

  private getGroupByChips(groupBy: GroupByPeriod): ArrayRow<AppChip> {
    return {id: 1, arr: this.chipsFactory.createEnumSelectionChips(GroupByPeriod, groupBy, this.addGroupBy)};
  }

  private getCriteriaChips(criteria: TimesheetCriteria, activeCriteriaCount: number): ArrayRow<AppChip> {
    if(activeCriteriaCount === 0) 
      return {id: 2, arr: [{text: "Åpne filter", color: "accent", onClick: this.openTimesheetFilter}]}
  
    return {
      id: 3, 
      arr: this.chipsFactory.createCriteriaChips(criteria, 
        (prop) => this.resetCriteriaProp(prop, criteria),
        {
          user: {valueFormatter: (val: User) => val.lastName + ', ' + val.lastName}, 
          mission: {valueFormatter: (val: Mission) => _getModelDisplayValue("missions", val)},
          dateRange: {valueFormatter: (val: DateRange) => _formatDateRange(val, _formatShortDate)}, 
          dateRangePreset: {ignored: true},
          status: {valueFormatter: (val: TimesheetStatus) => translations[TimesheetStatus[val]?.toLowerCase()]}, 
        }
      )
    } 

  }

}
