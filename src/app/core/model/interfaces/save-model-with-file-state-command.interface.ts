import { ModelFile } from '../../models';
import { SaveModelStateCommand } from './save-model-state-command.interface';

export interface SaveModelWithFileStateCommand<TModel extends ModelFile> extends SaveModelStateCommand<TModel>{
    file: File;
}