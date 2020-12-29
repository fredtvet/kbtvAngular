import { ModelFile } from '@core/models/base-entity-file.interface';
import { Prop } from 'global-types';
import { ModelFileWrapper, SaveAction, SaveModelAction } from 'state-model';
import { ModelState } from '../model-state.interface';

export const SaveModelFileAction = SaveModelAction+"_FILE";
export interface SaveModelFileAction<TModel extends ModelFile> extends SaveModelAction<TModel, ModelState>{
        stateProp: Prop<ModelState>,
        entity: TModel,
        fileWrapper: ModelFileWrapper,
        saveAction: SaveAction,  
        apiUrlOverride?: string,   
}
