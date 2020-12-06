import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from 'src/app/core/models';
import { HttpActionId, HttpCommand } from 'src/app/core/services/http/state/http.effect';
import { SaveModelStateCommand } from 'src/app/model/state/save-model/save-model-action.const';
import { SaveModelHttpEffect } from 'src/app/model/state/save-model/save-model.http.effect';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
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