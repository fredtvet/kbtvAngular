import { Timesheet } from '@core/models';
import { AppButton } from '@shared-app/interfaces';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';

export interface UserTimesheetListViewModel { 
    fabs?: AppButton[], 
    chips?: AppChip[], 
    navConfig?: MainTopNavConfig  
}