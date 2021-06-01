import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { User } from '@core/models';
import { ApiService } from '@core/services/api.service';
import { ModelState } from '@core/state/model-state.interface';
import { _saveModel } from 'model/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { SaveUserAction, SetSaveUserStateAction, UpdateUserPasswordAction } from './actions.const';

@Injectable()
export class SaveUserEffect implements Effect<SaveUserAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<SaveUserAction, ModelState>>): Observable<SetSaveUserStateAction> {
        return actions$.pipe(
            listenTo([SaveUserAction]),
            map(x => {
                const saveModelResult = _saveModel<ModelState, User>(x.stateSnapshot, "users", x.action.entity);
              
                return <SetSaveUserStateAction> {
                    type: SetSaveUserStateAction, 
                    stateProp: x.action.stateProp,
                    saveAction: x.action.saveAction,
                    saveModelResult,
                    password: x.action.password
                }
            })
        )
    }
}

@Injectable()
export class UpdateUserPasswordHttpEffect implements Effect<UpdateUserPasswordAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdateUserPasswordAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([UpdateUserPasswordAction]),
            mergeMap(({action}) => 
                this.apiService.put<void>(`${ApiUrl.Users}/${action.userName}/NewPassword`, action)),
        )
    }
}