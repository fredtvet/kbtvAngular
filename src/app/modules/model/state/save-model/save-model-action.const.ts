import { ModelStateCommand } from '../../interfaces';
import { ModelCommand } from '../../model-command.enum';

export type SaveAction = ModelCommand.Create | ModelCommand.Update;

export const SaveModelActionId = "SAVE_MODEL";

export interface SaveModelStateCommand<TModel, TState> extends ModelStateCommand<TState>{
    saveAction?: SaveAction;
    entity: TModel;
    apiUrlOverride?: string;
}

