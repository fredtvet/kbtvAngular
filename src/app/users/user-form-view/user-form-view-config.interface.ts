import { ModelFormViewConfig } from 'src/app/core/model/form';
import { User } from 'src/app/core/models';

export interface UserFormViewConfig extends ModelFormViewConfig<User, UserForm> {
    users: User[];
}

export interface UserForm extends User{
    password: string;
}