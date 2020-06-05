import { AppButton } from './app-button.interface';
import { User } from '../interfaces/models';

export interface MainNavConfig{
    isXs?: boolean;
    currentUser?: User;

    topDefaultNavConfig?: TopDefaultNavConfig;
    topDetailNavConfig?: TopDetailNavConfig;  
}

export interface TopDefaultNavConfig extends TopNavActions{
    title: string;
    subTitle?:string;
    subIcon?: string;
   
    elevationDisabled?: boolean;
}

export interface TopDetailNavConfig extends TopNavActions{   
    title?: string[];
    subTitle?:string;
    subIcon?: string;

    imgSrc?: string;
}

export interface TopNavActions{
    backFn?: Function;
    backFnParams?: any[];
    buttons?: AppButton[];
    bottomSheetButtons?: AppButton[];
}