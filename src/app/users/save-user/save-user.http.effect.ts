import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpActionId, HttpCommand } from 'src/app/core/services/http/state/http.effect';
import { SaveModelHttpEffect } from 'src/app/model/state/save-model/save-model.http.effect';
import { ActionType } from 'src/app/shared-app/enums';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { SaveUserActionId, SaveUserStateCommand } from './save-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserStateCommand> {

    constructor(){ super() }

    handle$(actions$: Observable<DispatchedAction<SaveUserStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveUserActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: super.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}),
        )
    }

    protected createHttpBody(command: SaveUserStateCommand): any {
        if(command.saveAction === ActionType.Update) return command.entity;
        return {...command.entity, password: command.password};
    }

}