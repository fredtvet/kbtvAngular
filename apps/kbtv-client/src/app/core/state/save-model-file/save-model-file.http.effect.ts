import { Inject, Injectable } from '@angular/core';
import { ModelFile } from '@core/models';
import { KeyVal, Prop, UnknownState } from 'global-types';
import { FormDataEntry } from 'optimistic-http';
import { Effect } from 'state-management';
import { ModelCommandApiMap, MODEL_COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS, SaveModelHttpEffect } from 'state-model';
import { ModelState } from '../model-state.interface';
import { SaveModelFileAction } from './save-model-file.action';

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect<ModelFile, ModelState>
    implements Effect<SaveModelFileAction<ModelFile>>{

    protected type: string = SaveModelFileAction;
    
    constructor(
        @Inject(MODEL_COMMAND_API_MAP) apiMap: ModelCommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(command: SaveModelFileAction<ModelFile>): FormDataEntry[] { 
        const file = command.fileWrapper?.modifiedFile;
        return <FormDataEntry[]>[
            ...this.convertToFormData(command.entity),
            {name: "file", value: file}
        ]
    }

    private convertToFormData(t: ModelFile): FormDataEntry[]{
        var entries: FormDataEntry[] = [];
        for(const name in t){
            entries.push({name, value: <string> t[<Prop<ModelFile>> name]})
        }
        return entries;
    }
}