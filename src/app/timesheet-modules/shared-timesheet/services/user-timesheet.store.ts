import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TimesheetCriteria, WeekCriteria, TimesheetSummary } from '../interfaces';
import { TimesheetSummaryAggregator } from './timesheet-summary.aggregator';
import { TimesheetFilter } from '../timesheet-filter.model';
import { WeekToTimesheetCriteriaAdapter } from '../week-to-timesheet-criteria.adapter';
import { Timesheet, Mission } from 'src/app/core/models';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { StateUserTimesheets, StateMissions } from 'src/app/core/services/state/interfaces';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from 'src/app/shared/enums';
import { FilteredResponse } from 'src/app/shared/interfaces';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria: TimesheetCriteria,
        userTimesheetListWeekCriteria: WeekCriteria,
        userTimesheetListGroupBy: GroupByPeriod,
}

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetStore extends ObservableStore<StoreState> {
  
  criteria$ = this.stateProperty$<TimesheetCriteria>("userTimesheetListCriteria");
  get criteria(): TimesheetCriteria{ return this.getStateProperty("userTimesheetListCriteria") || {}} 
  
  weekCriteria$ = this.stateProperty$<WeekCriteria>("userTimesheetListWeekCriteria");
  get weekCriteria(): WeekCriteria { return this.getStateProperty("userTimesheetListWeekCriteria") };

  groupBy$ = this.stateProperty$<GroupByPeriod>("userTimesheetListGroupBy");

  filteredTimesheets$: Observable<FilteredResponse<TimesheetCriteria, Timesheet>> = 
    this.stateSlice$(["userTimesheets", "userTimesheetListCriteria", "missions"]).pipe(
          map(state => {
            const relationCfg = new GetWithRelationsConfig("userTimesheets", null, ["missions"])
            const filter = new TimesheetFilter(state.userTimesheetListCriteria);
            return {
              criteria: filter?.criteria,
              records: this.getRangeWithRelationsHelper.get(state as any, relationCfg, filter?.check)
            }
          }),       
      );

  timesheetSummaries$: Observable<TimesheetSummary[]> = 
      combineLatest([this.filteredTimesheets$, this.groupBy$]).pipe(
          map(([filtered, groupBy]) => this.timesheetSummaryAggregator.groupByType(groupBy, filtered?.records)),
      );

  timesheetCriteriaFormState$: Observable<TimesheetCriteriaFormState> = 
      this.stateProperty$<Mission[]>("missions", false).pipe(
        map(x => { return { options:{missions:x, users:null} } })
      )

  constructor(
    base: ObservableStoreBase,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
    private timesheetSummaryAggregator: TimesheetSummaryAggregator
  ) {
    super(base);
  }


  addWeekFilterCriteria = (weekCriteria: WeekCriteria): void => 
    this.setState({
      userTimesheetListWeekCriteria: weekCriteria,
      userTimesheetListCriteria: new WeekToTimesheetCriteriaAdapter(weekCriteria)
    });
  

  addFilterCriteria = (criteria: TimesheetCriteria): void => {
    this.setState({userTimesheetListCriteria: criteria});
  }
  addGroupBy = (type: GroupByPeriod): void =>
    this.setState({userTimesheetListGroupBy: type});
  

}

