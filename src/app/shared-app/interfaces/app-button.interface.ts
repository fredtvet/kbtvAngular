import { ButtonTypes, Icons } from '../enums';

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
    color?: "primary" | "accent" | "warn"; 
    iconSizeClass?: string;
    aria?: string;
}