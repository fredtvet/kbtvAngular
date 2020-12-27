import { AppButton } from './interfaces/app-button.interface';

export const _trackByAppButton = (index: number, btn: AppButton) => 
    btn && (btn.callback?.prototype.constructor || btn.routerLink);