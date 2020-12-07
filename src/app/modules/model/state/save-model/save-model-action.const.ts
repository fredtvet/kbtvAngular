
import { Model } from '@core/models/base-entity.interface';
import { SaveAction } from '@shared/save-action.interface';
import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const SaveModelActionId = "SAVE_MODEL";

export interface SaveModelStateCommand<TModel extends Model> extends ModelStateCommand{
    saveAction?: SaveAction;
    entity: TModel;
    apiUrlOverride?: string;
}

