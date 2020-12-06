import { User } from 'src/app/core/models';
import { SaveModelStateCommand } from 'src/app/model/state/save-model/save-model-action.const';

export const SaveUserActionId = "SAVE_USER"

export interface SaveUserStateCommand extends SaveModelStateCommand<User>{
    password: string;
}