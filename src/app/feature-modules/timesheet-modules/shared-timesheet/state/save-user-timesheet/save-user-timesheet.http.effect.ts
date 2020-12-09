import { Inject, Injectable } from '@angular/core';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveUserTimesheetActionId, SaveUserTimesheetCommand } from './save-user-timesheet-command.interface';

@Injectable()
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserTimesheetCommand> {

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    handle$(actions$: Observable<DispatchedAction<SaveUserTimesheetCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveUserTimesheetActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: super.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}), 
        )
    }
}