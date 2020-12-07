import { User } from '@core/models';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';

export const SaveUserActionId = "SAVE_USER"

export interface SaveUserStateCommand extends SaveModelStateCommand<User>{
    password: string;
}