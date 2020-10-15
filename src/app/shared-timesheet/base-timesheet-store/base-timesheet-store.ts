import { HttpParams } from "@angular/common/http";
import { combineLatest, concat, Observable } from "rxjs";
import { map, shareReplay, take, tap, withLatestFrom } from "rxjs/operators";
import { ApiUrl } from "src/app/core/api-url.enum";
import { Mission, Timesheet, User } from "src/app/core/models";
import { ObservableStoreBase } from "src/app/core/services/state/observable-store-base";
import { ApiService } from "src/app/core/services/api.service";
import { TimesheetSummaryAggregator } from "src/app/core/services/utility/timesheet-summary.aggregator";
import { _addOrUpdateRange } from "src/app/shared-app/helpers/array/add-or-update-range.helper";
import { _convertArrayToObject } from "src/app/shared-app/helpers/array/convert-array-to-object.helper";
import { _filter } from "src/app/shared-app/helpers/array/filter.helper";
import { GroupedResponse } from 'src/app/shared-app/interfaces/grouped-response.interface';
import { TimesheetFilter } from "src/app/shared-timesheet/timesheet-filter.model";
import { GroupByPeriod } from "src/app/shared/enums";
import { TimesheetCriteria } from "../interfaces/timesheet-criteria.interface";
import { TimesheetSummary } from "../interfaces/timesheet-summary.interface";
import { BaseTimesheetStoreSettings } from "./base-timesheet-store-settings.interface";
import { BaseTimesheetStoreState } from "./base-timesheet-store-state";
import { FilteredResponse } from 'src/app/core/services/filter/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { BaseModelStore } from 'src/app/core/services/state/abstracts/base-model.store';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { _find } from 'src/app/shared-app/helpers/array/find.helper';
import { PersistanceStore } from 'src/app/core/services/persistance/persistance.store';

export type FilteredAndGrouped<T> = GroupedResponse<GroupByPeriod, T> &
  FilteredResponse<TimesheetCriteria,  T>;

export abstract class BaseTimesheetStore< TState extends Required<BaseTimesheetStoreState>> extends BaseModelStore<TState> {
  private static baseCriteria: TimesheetCriteria;

  users$ = this.modelProperty$<User[]>("users" as any).pipe(shareReplay());

  groupBy$ = this.stateProperty$<GroupByPeriod>(this.settings.groupByProp);

  filteredTimesheets$: Observable<FilteredResponse<TimesheetCriteria, Timesheet>> = 
    this.stateSlice$(["timesheets" as any, this.settings.criteriaProp]).pipe(
      map((state) => {
        const criteria = state[this.settings.criteriaProp];
        if(!criteria) return {criteria: null, records: null};
        const filter = new TimesheetFilter(state[this.settings.criteriaProp]);
        return {
          criteria: filter.criteria,
          records: _filter(state.timesheets, (entity) => filter.check(entity)),
        };
      }), shareReplay()
    );

  filteredAndGroupedTimesheets$: Observable<FilteredAndGrouped<Timesheet | TimesheetSummary>> = combineLatest([
    this.filteredTimesheets$,
    this.groupBy$,
    this.users$,
  ]).pipe(
    map(([filtered, groupBy, users]) => {
      const entities = this.timesheetSummaryAggregator.groupByType(groupBy, filtered.records) || filtered.records;    
      return {
        groupBy,
        criteria: filtered.criteria,
        records: this.addFullNameToEntities(entities, users),
      };
    }),
  );

  constructor(
    base: ObservableStoreBase,
    apiService: ApiService,
    private persistanceStore: PersistanceStore,
    private timesheetSummaryAggregator: TimesheetSummaryAggregator,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
    private settings: BaseTimesheetStoreSettings<TState>
  ) {
    super(base, apiService);
    this.setState(settings.initialState, null, false);
  }

  addTimesheetCriteria(criteria: TimesheetCriteria, withState?: Partial<TState>) {
    let state: Partial<TState> = withState || {};
    state[this.settings.criteriaProp] = criteria as any;

    const filter = new TimesheetFilter(criteria);

    //If current filter  data is contained in base, dont fetch http dataand use state.
    if(filter.containedIn(BaseTimesheetStore.baseCriteria))
      this.setState(state);
    else { 
      BaseTimesheetStore.baseCriteria = criteria;
      this.get$(criteria)
        .pipe(
          take(1),
          tap((timesheets) => {
            state.timesheets = _addOrUpdateRange(
              this.getStateProperty<Timesheet[]>("timesheets" as any),
              timesheets,
              "id"
            );
            this.setState(state, null, false);
          })
        ).subscribe();
    }
  }

  addGroupBy(type: GroupByPeriod) {
    let state: Partial<TState> = {};
    state[this.settings.groupByProp] = type as any;
    this.setState(state);
  }

  get$ = (filter: TimesheetCriteria): Observable<Timesheet[]> => {
    let params = new HttpParams();

    if (filter.user?.userName) params = params.set("UserName", filter.user.userName);

    if (filter.dateRange) {
      if (filter.dateRange[0])
        params = params.set(
          "StartDate",
          filter.dateRange[0].getTime().toString()
        );
      if (filter.dateRange[1])
        params = params.set(
          "EndDate",
          filter.dateRange[1].getTime().toString()
        );
    }
    if (filter.mission)
      params = params.set("MissionId", filter.mission.id.toString());

    return combineLatest([
      this.persistanceStore.stateInitalized$, 
      this.apiService.get(ApiUrl.Timesheet, params)
    ]).pipe(
      withLatestFrom(this.modelProperty$<Mission[]>("missions" as any)),
      map(([[stateInit, timesheets], missions]) =>
        this.addMissionToTimesheets({ timesheets, missions })
      )
    );
  };

  private addMissionToTimesheets(state: {
    timesheets: Timesheet[];
    missions: Mission[];
  }): Timesheet[] {
    const relationCfg = new GetWithRelationsConfig("timesheets", null, ["missions"]);
    return this.getRangeWithRelationsHelper.get(state, relationCfg);
  }

  private addFullNameToEntities(
    entities: (TimesheetSummary | Timesheet)[],
    users: User[]
  ): (TimesheetSummary | Timesheet)[] {
    if (!entities || !users) return entities;
    let usersObj = _convertArrayToObject(users, "userName");

    for(let i = 0; i < entities.length; i++){
      let timesheet = entities[i];
      const user = usersObj[timesheet.userName];
      if (user) timesheet.fullName = user.firstName + " " + user.lastName;
    }

    return entities;
  }
}
