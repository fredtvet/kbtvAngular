import { User } from 'src/app/core/models';

export interface UserForm extends User {
    password?: string;
}