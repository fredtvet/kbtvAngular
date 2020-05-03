import { AppButton } from './app-button.interface';

export interface MainNavConfig{

    altNav: boolean;
    title: string;
    icon: string;
    subTitle:string;
    subIcon: string;

    buttons?: AppButton[];
    
    searchFn?: Function;
    backFn?: Function;
    backFnParams?: any[];
    
    bottomSheetButtons?: AppButton[];
    
    menuBtnEnabled: boolean;
    elevationEnabled: boolean;

    context?: any;
}