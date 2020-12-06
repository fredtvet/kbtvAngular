import { ModelFile } from 'src/app/core/models/base-entity-file.interface';
import { ModelFileWrapper } from '../../model-file.wrapper';
import { SaveModelStateCommand } from '../save-model/save-model-action.const';

export const SaveModelFileActionId = "SAVE_MODEL_FILE";

export interface SaveModelFileStateCommand<TModel extends ModelFile> extends SaveModelStateCommand<TModel>{
    fileWrapper: ModelFileWrapper;
}
