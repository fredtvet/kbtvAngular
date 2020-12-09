import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';

export const SaveUserActionId = "SAVE_USER"

export interface SaveUserStateCommand extends SaveModelStateCommand<User, ModelState>{
    password: string;
}