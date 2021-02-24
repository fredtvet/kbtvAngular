import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Timesheet } from '@core/models';
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { _getSetPropCount } from '@shared-app/helpers/object/get-set-prop-count.helper';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { TimesheetSummary } from '@shared-timesheet/interfaces';
import { TimesheetCriteriaChipOptions } from '@shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from '@shared/enums';
import { ValueFormatterParams } from 'ag-grid-community';
import { FormService } from 'form-sheet';
import { Immutable, Maybe, Prop } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetStatisticFacade } from '../timesheet-statistic.facade';
import { TimesheetStatisticProviders } from './timesheet-statistic-providers.const';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';

interface ViewModel { 
  groupByChips: AppChip[], 
  criteriaChips: AppChip[], 
  tableConfig: AgGridConfig<TimesheetSummary | Timesheet>, 
  noRowsText: string
}

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: TimesheetStatisticProviders
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  private criteriaChips$: Observable<AppChip[]> = this.facade.criteria$.pipe(
    map(criteria => { 
      const activeCriteriaCount = criteria ? _getSetPropCount(criteria, {dateRangePreset: null}) : 0
      return  this.getCriteriaChips(criteria || {}, activeCriteriaCount)   
    })
  )

  vm$: Observable<ViewModel> = combineLatest([
    this.facade.groupBy$.pipe(map(x => this.getGroupByChips(x))),
    this.criteriaChips$,
    this.facade.tableConfig$,
    this.facade.isFetching$,
  ]).pipe(map(([groupByChips, criteriaChips, tableConfig, isFetching]) => { 
    return {groupByChips, criteriaChips, tableConfig, noRowsText: this.getNoRowsText(isFetching)} 
  }))

  navConfig: MainTopNavConfig = {title:  'Timestatistikk'};
  bottomActions: AppButton[];
  
  constructor( 
    private facade: TimesheetStatisticFacade,
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
  ) { 
    this.bottomActions =  [
      {icon: "filter_list", callback: this.openTimesheetFilter},
      {icon: "cloud_download", callback: this.exportAsCsv}     
    ]
  }

  private openTimesheetFilter = (): void => {
    this.formService.open<TimesheetCriteria, TimesheetCriteriaFormState>({
      formConfig: { ...TimesheetCriteriaForm, initialValue: this.facade.criteria}, 
      formState: this.facade.criteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: TimesheetCriteria) => this.facade.updateCriteria(val)
    })
  }

  private resetCriteriaProp(prop: Prop<Immutable<TimesheetCriteria>>, criteria: Maybe<Immutable<TimesheetCriteria>>){
    const clone = {...criteria || {}};
    clone[prop] = undefined;
    this.facade.updateCriteria(clone);
  }

  private exportAsCsv = () => {
    this.statTable.dataGrid.api.exportDataAsCsv({
      processCellCallback: (params) => {
        const colDef = params.column.getColDef()
        // Use coldef value formatter in export
        if (colDef.valueFormatter instanceof Function) {
          const valueFormatterParams: ValueFormatterParams = {
            ...params,
            data: params.node?.data,
            node: params.node!,
            colDef: params.column.getColDef()
          };
          return colDef.valueFormatter(valueFormatterParams);
        }
        return params.value;
      }
    });
  }

  private addGroupBy = (groupBy: GroupByPeriod) => this.facade.updateGroupBy(groupBy);

  private getGroupByChips(groupBy: Maybe<GroupByPeriod>):  AppChip[] {
    return this.chipsFactory.createEnumSelectionChips(GroupByPeriod, groupBy, this.addGroupBy);
  }

  private getCriteriaChips(criteria: Immutable<TimesheetCriteria>, activeCriteriaCount: number): AppChip[] {
    if(activeCriteriaCount === 0) 
      return [{text: "Åpne filter", color: "accent", onClick: this.openTimesheetFilter}]
  
    return this.chipsFactory.createCriteriaChips(criteria, 
        (prop) => this.resetCriteriaProp(prop, criteria), 
        TimesheetCriteriaChipOptions
      )
  }

  private getNoRowsText(isFetching: boolean): string {
    if(!navigator.onLine) return "Mangler internett-tilkobling";
    return isFetching ? 'Laster inn timer...' : 'Finner ingen timer med gitte filtre';
  }

}
