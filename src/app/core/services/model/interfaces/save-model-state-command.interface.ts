
import { Model } from 'src/app/core/models/base-entity.interface';
import { SaveAction } from '../../state/interfaces/save-action.interface';
import { ModelStateCommand } from './model-state-command.interface';

export interface SaveModelStateCommand<TModel extends Model> extends ModelStateCommand{
    saveAction?: SaveAction;
    entity: TModel;
}
