import { AppButton } from 'src/app/shared-app/interfaces';
import { MainSideNavConfig } from './main-side-nav-config.interface';

export interface MainNavConfig {  
    isXs?: boolean;
    sideNavConfig?: MainSideNavConfig;
    bottomNavConfig?: {navigations: AppButton[]};
}