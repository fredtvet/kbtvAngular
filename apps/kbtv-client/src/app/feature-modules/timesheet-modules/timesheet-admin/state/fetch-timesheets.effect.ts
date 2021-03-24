import { Injectable } from '@angular/core';
import { FetchTimesheetsAction } from '@shared-timesheet/state/fetch-timesheets.http.effect';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
import { StoreState } from '../store-state';
import { SetTimesheetCriteriaAction } from './set-timesheet-criteria.reducer';

@Injectable()
export class FetchTimesheetsEffect implements Effect<SetTimesheetCriteriaAction> {

    constructor(private store: Store<StoreState>){}

    handle$(actions$: Observable<DispatchedAction<SetTimesheetCriteriaAction>>): Observable<FetchTimesheetsAction> {
        return actions$.pipe(
            listenTo([SetTimesheetCriteriaAction]),
            map(x => { return <FetchTimesheetsAction>{ type: FetchTimesheetsAction, 
                timesheetCriteria: this.store.state.timesheetAdminTimesheetCriteria 
            }}),
        )
    }

}