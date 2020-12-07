import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from '@core/models';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { SaveUserTimesheetActionId, SaveUserTimesheetCommand } from './save-user-timesheet-command.interface';

@Injectable()
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserTimesheetCommand> {

    constructor(){ super() }

    handle$(actions$: Observable<DispatchedAction<SaveModelStateCommand<Model>>>): Observable<StateAction> {
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