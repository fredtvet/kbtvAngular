import { AppButton } from './app-button.interface';

export interface SimpleNavConfig{
    icon?: string;
    title?: string;
    colorClass?: string;
    leftBtn?: AppButton;
    buttons?: AppButton[];
}