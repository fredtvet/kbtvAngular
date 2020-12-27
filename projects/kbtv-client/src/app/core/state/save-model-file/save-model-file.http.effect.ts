import { Inject, Injectable } from '@angular/core';
import { ModelFile } from '@core/models';
import { FormDataEntry } from '@http/interfaces';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { Effect } from '@state/interfaces';
import { ModelState } from '../model-state.interface';
import { SaveModelFileAction } from './save-model-file.action';

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect<ModelFile, ModelState>
    implements Effect<SaveModelFileAction<ModelFile>>{

    protected type: string = SaveModelFileAction;
    
    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(command: SaveModelFileAction<ModelFile>): FormDataEntry[] { 
        const file = command.fileWrapper.modifiedFile;
        const entries: FormDataEntry[] = [{name: "command", value: JSON.stringify(command.entity)}]
        if(file) entries.push({name: "files", value: file})
        return entries
    }
}