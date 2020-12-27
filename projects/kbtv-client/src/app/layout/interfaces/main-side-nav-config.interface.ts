import { User } from '@core/models/user.interface';
import { Maybe, Immutable } from '@global/interfaces';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

export interface MainSideNavConfig{
    user: Maybe<Immutable<User>>;
    syncTimestamp: number;
    isOnline: boolean;
    navigations: AppButton[];
}