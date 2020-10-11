import { User } from 'src/app/core/models';
import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';

export const UpdateCurrentUserAction = "UPDATE_CURRENT_USER"

export interface UpdateCurrentUserStateCommand extends StateCommand{
    user: User;
}