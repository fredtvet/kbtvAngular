import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { Timesheet } from '@core/models';
import { ApiService } from '@core/services/api.service';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../timesheet-filter/timesheet-filter.model';
import { SetFetchedTimesheetsActionId } from './set-fetched-timesheets.reducer';

export const FetchTimesheetsActionId = "FETCH_TIMESHEETS";

export interface FetchTimesheetsStateCommand extends StateAction {
    timesheetCriteria: TimesheetCriteria;
}

@Injectable()
export class FetchTimesheetsHttpEffect implements Effect<FetchTimesheetsStateCommand> {

  static baseCriteria: TimesheetCriteria;

  constructor(private apiService: ApiService){ }

  handle$(actions$: Observable<DispatchedAction<FetchTimesheetsStateCommand>>): Observable<StateAction> {
    return actions$.pipe(
      listenTo([FetchTimesheetsActionId]),
      filter(x => x.action.timesheetCriteria != null),
      mergeMap(x => this._handle$(x.action))
    )
  }

  private _handle$(action: FetchTimesheetsStateCommand): Observable<StateAction>{
        const filter = new TimesheetFilter(action.timesheetCriteria);
        //If resulting data is already in cache, dont fetch.
        if(filter.containedIn(FetchTimesheetsHttpEffect.baseCriteria)) return of(null);
        
        FetchTimesheetsHttpEffect.baseCriteria = action.timesheetCriteria;
        return this.fetch$(action.timesheetCriteria).pipe(
            take(1),
            map(timesheets => { return { 
              actionId: SetFetchedTimesheetsActionId, timesheets 
            }})
        )        
  }
    
  private fetch$ = (criteria: TimesheetCriteria): Observable<Timesheet[]> => {
        let params = new HttpParams();
    
        if (criteria.user?.userName) params = params.set("UserName", criteria.user.userName);
    
        if (criteria.dateRange) {
          if (criteria.dateRange.start)
            params = params.set(
              "StartDate",
              new Date(criteria.dateRange.start).getTime().toString()
            );
          if (criteria.dateRange.end)
            params = params.set(
              "EndDate",
              new Date(criteria.dateRange.end).getTime().toString()
            );
        }
        if (criteria.mission)
          params = params.set("MissionId", criteria.mission.id.toString());
    
        return this.apiService.get(ApiUrl.Timesheet, params)
  };
}