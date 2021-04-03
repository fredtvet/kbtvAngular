import { User } from '@core/models/user.interface';
import { Maybe, Immutable } from 'global-types';

export interface MainSideNavConfig{
    user: Maybe<Immutable<User>>;
    syncTimestamp: number;
    isOnline: boolean;
}