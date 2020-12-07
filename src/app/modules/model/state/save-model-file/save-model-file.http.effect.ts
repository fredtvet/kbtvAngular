import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelFile } from '@core/models';
import { HttpCommand, HttpActionId } from '@http/state/http.effect';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { DispatchedAction } from '../../../state/action-dispatcher';
import { SaveModelHttpEffect } from '../save-model/save-model.http.effect';
import { SaveModelFileActionId, SaveModelFileStateCommand } from './save-model-file-action.const';

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect 
    implements Effect<SaveModelFileStateCommand<ModelFile>>{

    constructor(){ super() }

    handle$(actions$: Observable<DispatchedAction<SaveModelFileStateCommand<ModelFile>>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveModelFileActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}), 
        )
    }

    protected createHttpBody(command: SaveModelFileStateCommand<ModelFile>): FormData {
        const body: FormData = new FormData();   
        const file = command.fileWrapper.modifiedFile;
        if(file) body.append("files", file, file.name);
        body.append("command", JSON.stringify(command.entity));
        return body;
    }

}