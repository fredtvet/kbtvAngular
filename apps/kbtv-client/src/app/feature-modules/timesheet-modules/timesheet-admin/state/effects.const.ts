import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { FetchTimesheetsAction, SetTimesheetCriteriaAction } from '@shared-timesheet/state/actions.const';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
import { StoreState } from '../store-state';
import { SetTimesheetCriteriaWithWeekCriteriaAction, UpdateLeaderSettingsAction, UpdateLeaderSettingsSuccessAction } from './actions.const';

@Injectable()
export class UpdateLeaderSettingsHttpEffect implements Effect<UpdateLeaderSettingsAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdateLeaderSettingsAction>>): Observable<UpdateLeaderSettingsSuccessAction> {
        return actions$.pipe(
            listenTo([UpdateLeaderSettingsAction]),
            mergeMap(x => 
                this.apiService.put(ApiUrl.LeaderSettings, x.action.settings).pipe(map(() => { 
                    return <UpdateLeaderSettingsSuccessAction> { 
                        type: UpdateLeaderSettingsSuccessAction, settings: x.action.settings 
                    }
                }))
            ),
        )
    }

}

@Injectable()
export class FetchTimesheetsEffect implements Effect<SetTimesheetCriteriaAction> {

    constructor(private store: Store<StoreState>){}

    handle$(actions$: Observable<DispatchedAction<SetTimesheetCriteriaAction>>): Observable<FetchTimesheetsAction> {
        return actions$.pipe(
            listenTo([SetTimesheetCriteriaWithWeekCriteriaAction]),
            map(x => { return <FetchTimesheetsAction>{ type: FetchTimesheetsAction, 
                timesheetCriteria: this.store.state.timesheetAdminTimesheetCriteria 
            }}),
        )
    }

}