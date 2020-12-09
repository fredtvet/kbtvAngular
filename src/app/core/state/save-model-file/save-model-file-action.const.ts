import { ModelFile } from '@core/models/base-entity-file.interface';
import { ModelFileWrapper } from '@model/model-file.wrapper';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';

export const SaveModelFileActionId = "SAVE_MODEL_FILE";

export interface SaveModelFileStateCommand<TModel extends ModelFile, TState> extends SaveModelStateCommand<TModel, TState>{
    fileWrapper: ModelFileWrapper;
}
