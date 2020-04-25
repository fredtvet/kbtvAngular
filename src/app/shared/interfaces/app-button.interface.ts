import { AppAction } from './app-action.interface';

export interface AppButton extends AppAction{
    text?: string;
    icon?: string;
    colorClass?: string; 
    iconSizeClass?: string;
    allowedRoles?: string[];
    aria?: string;
    callback: Function;
    params?: any[];
}