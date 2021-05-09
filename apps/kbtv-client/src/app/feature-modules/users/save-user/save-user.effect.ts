import { SaveUserAction, SetSaveUserStateAction } from '@actions/user-actions';
import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _saveModel } from 'model/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

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