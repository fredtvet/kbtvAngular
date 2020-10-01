import { ModelFile } from 'src/app/core/models/base-entity-file.interface';
import { SaveModelStateCommand } from './save-model-state-command.interface';

export interface SaveModelWithFileStateCommand<TModel extends ModelFile> extends SaveModelStateCommand<TModel>{
    file: File;
}