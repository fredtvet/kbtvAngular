import { Inject, Injectable } from '@angular/core';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { ModelCommand } from '@model/model-command.enum';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { StateAction, Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveUserActionId, SaveUserStateCommand } from './save-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserStateCommand> {

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

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
        if(command.saveAction === ModelCommand.Update) return command.entity;
        return {...command.entity, password: command.password};
    }

}