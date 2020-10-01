import { User } from 'src/app/core/models';
import { ModelFormViewConfig } from 'src/app/core/services/model/form/interfaces';

export interface UserFormViewConfig extends ModelFormViewConfig<User, UserForm> {
    users: User[];
}

export interface UserForm extends User{
    password: string;
}