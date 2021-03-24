import { User } from '@core/models/user.interface';
import { Maybe, Immutable } from 'global-types';
import { AppButton } from '@shared/components/app-button/app-button.interface';

export interface MainSideNavConfig{
    user: Maybe<Immutable<User>>;
    syncTimestamp: number;
    isOnline: boolean;
    navigations: AppButton[];
}