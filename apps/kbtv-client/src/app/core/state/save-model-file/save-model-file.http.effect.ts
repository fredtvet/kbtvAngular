import { SaveModelFileAction } from '@actions/global-actions';
import { Inject, Injectable } from '@angular/core';
import { ModelFile } from '@core/models';
import { Prop } from 'global-types';
import { FormDataEntry } from 'optimistic-http';
import { Effect } from 'state-management';
import { ModelCommandApiMap, MODEL_COMMAND_API_MAP, SaveModelHttpEffect } from 'model-state';
import { ModelState } from '../model-state.interface';

@Injectable()
export class SaveModelFileHttpEffect extends SaveModelHttpEffect<ModelFile, ModelState>
    implements Effect<SaveModelFileAction<ModelFile>>{

    protected type: string = SaveModelFileAction;
    
    constructor(@Inject(MODEL_COMMAND_API_MAP) apiMap: ModelCommandApiMap){ super(apiMap) }

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