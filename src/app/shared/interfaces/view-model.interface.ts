import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from '../components/main-top-nav/main-top-nav-config.interface';

export interface ViewModel<T> {
    navConfig?: MainTopNavConfig;
    fabs?: AppButton[];
    chipRows?: AppChip[][];
    content?: T;
}