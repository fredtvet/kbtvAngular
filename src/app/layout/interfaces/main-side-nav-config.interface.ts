import { User } from '@core/models/user.interface';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

export interface MainSideNavConfig{
    user: User;
    isOnline: boolean;
    navigations: AppButton[];
}