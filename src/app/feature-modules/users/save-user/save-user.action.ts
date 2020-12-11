import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveAction } from '@model/interfaces';
import { SaveModelAction } from '@model/state/save-model/save-model.action';

export class SaveUserAction extends SaveModelAction<User, ModelState>{
    constructor(
        entity: User,
        public password: string,
        saveAction: SaveAction,    
    ){ super("users", entity, saveAction) };
}