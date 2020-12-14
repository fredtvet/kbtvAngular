import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ValueFormatterParams } from 'ag-grid-community';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet } from '@core/models';
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { _getSetPropCount } from '@shared-app/helpers/object/get-set-prop-count.helper';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from '@shared/enums';
import { TimesheetSummary } from '../../shared-timesheet/interfaces';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetStatisticFacade } from '../timesheet-statistic.facade';
import { TimesheetStatisticProviders } from './timesheet-statistic-providers.const';
import { TimesheetStatisticTableComponent } from './timesheet-statistic-table/timesheet-statistic-table.component';
import { FormService } from '@form-sheet/form-sheet.service';
import { Immutable } from '@immutable/interfaces';

interface NavViewModel { groupByChips: AppChip[], criteriaChips: AppChip[],  navConfig: MainTopNavConfig }

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: TimesheetStatisticProviders
})
export class TimesheetStatisticComponent {
  @ViewChild('statTable') statTable: TimesheetStatisticTableComponent;

  private partialVm$: Observable<Partial<NavViewModel>> = this.facade.criteria$.pipe(map(criteria => { 
    const activeCriteriaCount = _getSetPropCount(criteria, {dateRangePreset: null})
    return {
      criteriaChips: this.getCriteriaChips(criteria, activeCriteriaCount), 
      navConfig: this.getNavConfig(activeCriteriaCount)
    }
  }))

  navVm$: Observable<NavViewModel> = combineLatest([
    this.facade.groupBy$.pipe(map(x => this.getGroupByChips(x))),
    this.partialVm$
  ]).pipe(
    map(([groupByChips, navVm]) => {
      navVm.groupByChips = groupByChips; 
      return <NavViewModel> navVm
    }), 
  )
  
  tableConfig$: Observable<AgGridConfig<TimesheetSummary | Timesheet>> = this.facade.tableConfig$;

  constructor( 
    private facade: TimesheetStatisticFacade,
    private formService: FormService,
    private chipsFactory: ChipsFactoryService
  ) { }

  private openTimesheetFilter = (): void => {
    this.formService.open<TimesheetCriteria, TimesheetCriteriaFormState>({
      formConfig: { ...TimesheetCriteriaForm, initialValue: this.facade.criteria}, 
      formState: this.facade.criteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: TimesheetCriteria) => this.facade.updateCriteria(val)
    })
  }

  private resetCriteriaProp(prop: string, criteria: Immutable<TimesheetCriteria>){
    criteria[prop] = null;
    this.facade.updateCriteria(criteria);
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

  private addGroupBy = (groupBy: GroupByPeriod) => this.facade.updateGroupBy(groupBy);

  private getNavConfig(activeCriteriaCount: number): MainTopNavConfig {
    return { title:  "Timestatistikk",
      buttons: [
        {icon: "filter_list", color: activeCriteriaCount && activeCriteriaCount > 0 ? "accent" : null, 
          callback: this.openTimesheetFilter},
        {icon: "cloud_download", callback: this.exportAsCsv}     
      ]
    }
  }

  private getGroupByChips(groupBy: GroupByPeriod):  AppChip[] {
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

}
