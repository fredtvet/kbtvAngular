import { ModelFile } from '@core/models/base-entity-file.interface';
import { ModelFileWrapper } from '@shared/model-file.wrapper';
import { Prop } from 'global-types';
import { SaveAction, SaveModelAction } from 'state-model';
import { ModelState } from '../model-state.interface';

export const SaveModelFileAction = SaveModelAction+"_FILE";
export interface SaveModelFileAction<TModel extends ModelFile> extends SaveModelAction<TModel, ModelState>{
        stateProp: Prop<ModelState>,
        entity: TModel,
        fileWrapper: ModelFileWrapper,
        saveAction: SaveAction,  
        apiUrlOverride?: string,   
}
