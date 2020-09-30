import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { FilterStore } from 'src/app/core/filter/interfaces/filter-store.interface';
import { FilteredResponse } from 'src/app/core/filter/interfaces/filtered-response.interface';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { Timesheet } from "src/app/core/models";
import { ObservableStore } from 'src/app/core/observable-store/observable-store';
import { ObservableStoreBase } from 'src/app/core/observable-store/observable-store-base';
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { WeekToTimesheetCriteriaConverter } from 'src/app/core/services/utility/week-to-timesheet-criteria.converter';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria, TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetFilter } from 'src/app/shared-timesheet/timesheet-filter.model';
import { GroupByPeriod } from 'src/app/shared/enums';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetListStore extends ObservableStore<StoreState> 
  implements FilterStore<TimesheetCriteria, TimesheetFilterViewConfig> {

  private _weekCriteria: WeekCriteria;
  
  get weekCriteria(): WeekCriteria { return {...this._weekCriteria} };

  get criteria(){return this.getStateProperty<TimesheetCriteria>("userTimesheetListCriteria") || {}} 

  groupBy$ = this.stateProperty$<GroupByPeriod>("userTimesheetListGroupBy");

  filteredTimesheets$: Observable<FilteredResponse<TimesheetCriteria, Timesheet>> = 
    this.stateSlice$(["userTimesheets", "userTimesheetListCriteria", "missions"]).pipe(
          filter(x => x.userTimesheets != null && x.userTimesheetListCriteria != null),
          map(state => { 
            const relationCfg = new GetWithRelationsConfig("userTimesheets", null, {include: {missions: true}})
            const filter = new TimesheetFilter(state.userTimesheetListCriteria);
            return {
              criteria: filter.criteria,
              activeCriteriaCount: filter.activeCriteriaCount,
              records: this.getRangeWithRelationsHelper.get(state as any, relationCfg, filter.check)
            }
          }),       
      );

  timesheetSummaries$: Observable<TimesheetSummary[]> = 
      combineLatest([this.filteredTimesheets$, this.groupBy$]).pipe(
          filter(([filtered]) => filtered != null || filtered.records != null),
          map(([filtered, groupBy]) => this.timesheetSummaryAggregator.groupByType(groupBy, filtered.records)),
      );

  filterConfig$: Observable<TimesheetFilterViewConfig> = 
    this.stateSlice$(["missions", "userTimesheetListCriteria"]).pipe(map(state => {
      return {criteria: state.userTimesheetListCriteria, state: {missions: state.missions, users: null}}
    }));

  constructor(
    base: ObservableStoreBase,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
    private weekToTimesheetCriteriaConverter: WeekToTimesheetCriteriaConverter,
    private timesheetSummaryAggregator: TimesheetSummaryAggregator
  ) {
    super(base);
  }

  addWeekFilterCriteria(weekCriteria: WeekCriteria): void{
    this._weekCriteria = weekCriteria;
    this.addFilterCriteria(this.weekToTimesheetCriteriaConverter.convert(weekCriteria))
  }

  addFilterCriteria(criteria: TimesheetCriteria){
    this.setState({userTimesheetListCriteria: criteria});
  }

  addGroupBy(type: GroupByPeriod){
    this.setState({userTimesheetListGroupBy: type});
  }

}

