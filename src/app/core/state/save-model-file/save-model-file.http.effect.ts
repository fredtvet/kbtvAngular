import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelFile } from '@core/models';
import { HttpCommand, HttpActionId } from '@http/state/http.effect';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { SaveModelFileActionId, SaveModelFileStateCommand } from './save-model-file-action.const';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { DispatchedAction } from '@state/action-dispatcher';
import { ModelState } from '../model-state.interface';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';

type SaveCommand = SaveModelFileStateCommand<ModelFile, ModelState>;

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect 
    implements Effect<SaveCommand>{

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    handle$(actions$: Observable<DispatchedAction<SaveCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveModelFileActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}), 
        )
    }

    protected createHttpBody(command: SaveCommand): FormData {
        const body: FormData = new FormData();   
        const file = command.fileWrapper.modifiedFile;
        if(file) body.append("files", file, file.name);
        body.append("command", JSON.stringify(command.entity));
        return body;
    }

}