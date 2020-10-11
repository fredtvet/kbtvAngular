
import { Model } from 'src/app/core/models/base-entity.interface';
import { SaveAction } from '../../../state/interfaces/save-action.interface';
import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const SaveModelAction = "SAVE_MODEL";

export interface SaveModelStateCommand<TModel extends Model> extends ModelStateCommand{
    saveAction?: SaveAction;
    entity: TModel;
    action: string;
    apiUrlOverride?: string;
}
