import { SaveAction } from '../../interfaces';
import { ModelStateAction } from '../model-state.action';

export const SaveModelAction = "SAVE_MODEL_ACTION";
export interface SaveModelAction<TModel, TState> extends ModelStateAction<TState>{
    entity: TModel,
    saveAction: SaveAction,  
    apiUrlOverride?: string
}

