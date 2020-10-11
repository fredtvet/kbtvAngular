import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';

export const UpdatePasswordAction = "UPDATE_PASSWORD";

export interface UpdatePasswordStateCommand extends StateCommand {
    oldPassword: string, 
    newPassword: string
}