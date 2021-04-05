import { AppButton } from '../shared/components/app-button/app-button.interface';

export const _trackByAppButton = (index: number, btn: AppButton) => 
    btn && (btn.text || "" + btn.icon || "");
