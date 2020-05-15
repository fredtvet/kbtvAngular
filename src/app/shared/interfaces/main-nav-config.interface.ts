import { AppButton } from './app-button.interface';

export interface MainNavConfig{
    title: string;
    multiLineTitle?: string[];

    subTitle?:string;
    subIcon?: string;

    buttons?: AppButton[];
    bottomSheetButtons?: AppButton[];

    backFn?: Function;
    backFnParams?: any[];
       
    elevationEnabled?: boolean;

    isXs?: boolean;
}