import { User } from 'src/app/core/models';
import { SaveModelStateCommand } from 'src/app/core/services/model/interfaces';

export interface SaveUserCommand extends SaveModelStateCommand<User>{
    password: string;
}