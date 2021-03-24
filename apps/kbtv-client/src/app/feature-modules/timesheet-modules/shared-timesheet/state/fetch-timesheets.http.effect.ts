import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { Timesheet } from '@core/models';
import { ApiService } from '@core/services/api.service';
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../timesheet-filter/timesheet-filter.model';
import { SetCriteriaCacheAction } from './set-criteria-cache.reducer';
import { SetFetchedTimesheetsAction } from './set-fetched-timesheets.reducer';
import { StateSharedTimesheet } from './state-shared-timesheet.interface';

export const FetchTimesheetsAction = "FETCH_TIMESHEETS_ACTION";
export interface FetchTimesheetsAction extends StateAction {
    timesheetCriteria: TimesheetCriteria
}

@Injectable()
export class FetchTimesheetsHttpEffect implements Effect<FetchTimesheetsAction> {

  constructor(private apiService: ApiService){ }

  handle$(actions$: Observable<DispatchedAction<FetchTimesheetsAction, StateSharedTimesheet>>): Observable<StateAction> {
    return actions$.pipe(
      listenTo([FetchTimesheetsAction]),
      filter(x => !this.isContained(x.action.timesheetCriteria, x.stateSnapshot.timesheetCriteriaCache)),
      switchMap(x => this.fetchTimesheets$(x.action)), 
    )
  }

  private fetchTimesheets$(action: Immutable<FetchTimesheetsAction>): Observable<SetFetchedTimesheetsAction | SetCriteriaCacheAction>{
      return merge(
        of(<SetCriteriaCacheAction>{type: SetCriteriaCacheAction, criteria: action.timesheetCriteria}),
        this.fetch$(action.timesheetCriteria).pipe(
          take(1),
          map(timesheets => <SetFetchedTimesheetsAction>{ type: SetFetchedTimesheetsAction, timesheets })
        ),
      )      
  }

  private isContained(criteria: Maybe<Immutable<TimesheetCriteria>>, criteriaCache: Maybe<ImmutableArray<TimesheetCriteria>>): boolean {
    if(!criteria) return true;
    if(!criteriaCache?.length) return false;
    const filter = new TimesheetFilter(criteria);

    for(const criteria of criteriaCache)
      if(filter.containedIn(criteria)) return true;

    return false;
  }
    
  private fetch$ = (criteria: Immutable<TimesheetCriteria>): Observable<Timesheet[]> => {
        let params = new HttpParams();
    
        if (criteria.user?.userName) params = params.set("UserName", criteria.user.userName);
    
        if (criteria.dateRange) {
          if (criteria.dateRange.start)
            params = params.set(
              "StartDate",
              new Date(criteria.dateRange.start as Date).getTime().toString()
            );
          if (criteria.dateRange.end)
            params = params.set(
              "EndDate",
              new Date(criteria.dateRange.end as Date).getTime().toString()
            );
        }
        if (criteria.mission?.id)
          params = params.set("MissionId", criteria.mission.id.toString());
    
        return this.apiService.get(ApiUrl.Timesheet, params)
  };
}