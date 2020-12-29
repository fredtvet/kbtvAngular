import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { Timesheet } from '@core/models';
import { ApiService } from '@core/services/api.service';
import { Immutable } from 'global-types';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../timesheet-filter/timesheet-filter.model';
import { SetFetchedTimesheetsAction } from './set-fetched-timesheets.reducer';

export const FetchTimesheetsAction = "FETCH_TIMESHEETS_ACTION";
export interface FetchTimesheetsAction extends StateAction {
    timesheetCriteria: TimesheetCriteria
}

@Injectable()
export class FetchTimesheetsHttpEffect implements Effect<FetchTimesheetsAction> {

  static baseCriteria: Immutable<TimesheetCriteria>;

  constructor(private apiService: ApiService){ }

  handle$(actions$: Observable<DispatchedAction<FetchTimesheetsAction>>): Observable<StateAction |  void> {
    return actions$.pipe(
      listenTo([FetchTimesheetsAction]),
      filter(x => x.action.timesheetCriteria != null),
      mergeMap(x => this._handle$(x.action))
    )
  }

  private _handle$(action: Immutable<FetchTimesheetsAction>): Observable<SetFetchedTimesheetsAction | void>{
        const filter = new TimesheetFilter(action.timesheetCriteria);
        //If resulting data is already in cache, dont fetch.
        if(filter.containedIn(FetchTimesheetsHttpEffect.baseCriteria)) return of();
        
        FetchTimesheetsHttpEffect.baseCriteria = action.timesheetCriteria;
        return this.fetch$(action.timesheetCriteria).pipe(
            take(1),
            map(timesheets => <SetFetchedTimesheetsAction>{ type: SetFetchedTimesheetsAction, timesheets })
        )        
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