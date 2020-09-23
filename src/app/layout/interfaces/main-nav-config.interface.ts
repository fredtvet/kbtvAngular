import { Type } from '@angular/core';
import { AppButton } from '../../shared-app/interfaces/app-button.interface';
import { MainSideNavConfig } from './main-side-nav-config.interface';
import { TopNavComponent } from './top-nav-component.interface';

export interface MainNavConfig<TTopConfig> {  
    fabs?: AppButton[];
    isXs?: boolean;
    sideNavConfig?: MainSideNavConfig;
    topNavConfig?: TTopConfig
    topNavComponent?: Type<TopNavComponent<any>>;
}