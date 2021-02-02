import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainSideNavConfig } from './main-side-nav-config.interface';

export interface MainNavConfig {  
    isXs?: boolean;
    sideNavConfig?: MainSideNavConfig;
}