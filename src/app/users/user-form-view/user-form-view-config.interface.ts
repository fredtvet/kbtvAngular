import { User } from 'src/app/core/models';
import { ModelFormViewConfig } from 'src/app/core/services/model/form/interfaces';

export interface UserFormViewConfig extends ModelFormViewConfig<User, User> {
    users: User[];
}
