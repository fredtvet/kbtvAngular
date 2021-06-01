import { Injectable } from '@angular/core';
import { FetchTimesheetsAction, SetTimesheetCriteriaAction } from '@shared-timesheet/state/actions.const';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
import { StoreState } from './store-state';

@Injectable()
export class FetchTimesheetsEffect implements Effect<SetTimesheetCriteriaAction> {

    constructor(private store: Store<StoreState>){}

    handle$(actions$: Observable<DispatchedAction<SetTimesheetCriteriaAction>>): Observable<FetchTimesheetsAction> {
        return actions$.pipe(
            listenTo([SetTimesheetCriteriaAction]),
            map(x => { return <FetchTimesheetsAction>{ type: FetchTimesheetsAction, 
                timesheetCriteria: this.store.state.timesheetStatisticTimesheetCriteria 
            }}),
        )
    }

}