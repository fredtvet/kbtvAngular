import { Maybe } from '@global/interfaces';
import { User } from '../user.interface';

export interface UserForeign {
    userName?: string;
    user?: Maybe<User>;
    fullName?: Maybe<string>;
}