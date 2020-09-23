import { AppButton } from 'src/app/shared-app/interfaces';

export interface TopNavConfig{
    subTitle?:string;
    subIcon?: string;
    userRole?: string;

    backFn?: Function;
    backFnParams?: any[];
    buttons?: AppButton[];
    bottomSheetButtons?: AppButton[];
}