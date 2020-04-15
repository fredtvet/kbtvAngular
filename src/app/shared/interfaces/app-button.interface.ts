import { AppAction } from './app-action.interface';

export interface AppButton extends AppAction{
    text?: string;
    icon?: string;
    color?: string; 
    allowedRoles?: string[];
    callback: Function;
}