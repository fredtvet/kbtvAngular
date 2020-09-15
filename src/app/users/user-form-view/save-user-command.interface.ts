import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { User } from 'src/app/core/models';

export interface SaveUserCommand extends SaveModelStateCommand<User>{
    password: string;
}