import { UpdateLeaderSettingsAction, UpdateLeaderSettingsSuccessAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

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