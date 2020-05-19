import { AppButton } from './app-button.interface';

export interface SimpleNavConfig{
    title?: string;
    colorClass?: string;
    leftBtn?: AppButton;
    buttons?: AppButton[];
}