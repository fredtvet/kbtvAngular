import { Type } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { ModelFile } from '@core/models';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { Effect } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { SaveModelFileAction } from './save-model-file.action';

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect 
    implements Effect<SaveModelFileAction<ModelFile>>{

    protected action: Type<StateAction> = SaveModelFileAction;
    
    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(command: SaveModelFileAction<ModelFile>): FormData {
        const body: FormData = new FormData();   
        const file = command.fileWrapper.modifiedFile;
        if(file) body.append("files", file, file.name);
        body.append("command", JSON.stringify(command.entity));
        return body;
    }
}