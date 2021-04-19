import { FetchTimesheetsAction, SetTimesheetCriteriaAction, SetTimesheetCriteriaWithWeekCriteriaAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
import { StoreState } from '../store-state';

@Injectable()
export class FetchTimesheetsEffect implements Effect<SetTimesheetCriteriaAction> {

    constructor(private store: Store<StoreState>){}

    handle$(actions$: Observable<DispatchedAction<SetTimesheetCriteriaAction>>): Observable<FetchTimesheetsAction> {
        return actions$.pipe(
            listenTo([SetTimesheetCriteriaWithWeekCriteriaAction]),
            map(x => { console.log(x); return <FetchTimesheetsAction>{ type: FetchTimesheetsAction, 
                timesheetCriteria: this.store.state.timesheetAdminTimesheetCriteria 
            }}),
        )
    }

}