import { Timesheet } from 'src/app/core/models';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';

export interface UserTimesheetListViewModel { 
    fabs?: AppButton[], 
    chips?: AppChip[], 
    navConfig?: MainTopNavConfig  
}