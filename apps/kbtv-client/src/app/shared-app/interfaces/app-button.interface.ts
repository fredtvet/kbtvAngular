import { Icons } from "../enums/icons.enum";
import { ButtonTypes } from "../enums/button-types.enum";

export interface AppButton{
    text?: string;
    icon?: string;
    type?: ButtonTypes;
    allowedRoles?: string[];

    callback?: Function;
    params?: unknown[];

    svgIcon?: Icons;
    color?: "primary" | "accent" | "warn"; 
    iconSizeClass?: string;
    aria?: string;
}
