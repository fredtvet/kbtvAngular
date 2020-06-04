import { AppAction } from './app-action.interface';
import { Icons } from '../enums/icons.enum';


export interface AppButton extends AppAction{
    text?: string;
    icon?: string;
    svgIcon?: Icons;
    colorClass?: string; 
    iconSizeClass?: string;
    allowedRoles?: string[];
    aria?: string;
    callback: Function;
    params?: any[];
}