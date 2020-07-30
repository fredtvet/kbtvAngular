import { Icons } from '../enums/icons.enum';


export interface AppButton{
    text?: string;
    icon?: string;
    allowedRoles?: string[];

    routerLink?: string;

    callback?: Function;
    params?: any[];

    children?: AppButton[];
    svgIcon?: Icons;
    colorClass?: string; 
    iconSizeClass?: string;
    aria?: string;
}