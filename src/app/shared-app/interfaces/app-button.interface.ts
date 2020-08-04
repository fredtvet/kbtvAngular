import { Icons } from '../enums/icons.enum';
import { ButtonTypes } from '../enums/button-types.enum';


export interface AppButton{
    text?: string;
    icon?: string;
    type?: ButtonTypes;
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