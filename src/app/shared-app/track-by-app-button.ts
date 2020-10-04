import { AppButton } from './interfaces/app-button.interface';

export const TrackByAppButton = (index: number, btn: AppButton) => 
    btn && (btn.callback?.prototype.constructor || btn.routerLink);