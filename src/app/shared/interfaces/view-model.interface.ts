import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from '../components/main-top-nav/main-top-nav-config.interface';
import { ArrayRow } from './array-row.interface';

export interface ViewModel<T> {
    navConfig?: MainTopNavConfig;
    fabs?: AppButton[];
    chipRows?: ArrayRow<AppChip>[];
    content?: T;
}