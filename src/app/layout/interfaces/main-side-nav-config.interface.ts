import { User } from 'src/app/core/models/user.interface';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';

export interface MainSideNavConfig{
    user: User;
    isOnline: boolean;
    navigations: AppButton[];
}