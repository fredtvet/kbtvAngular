import { User } from 'src/app/core/models';
import { SaveModelStateCommand } from 'src/app/core/services/model/state/save-model/save-model-state-command.interface';

export const SaveUserAction = "SAVE_USER"

export interface SaveUserStateCommand extends SaveModelStateCommand<User>{
    password: string;
}