import { TimesheetSummary, WeekCriteria } from 'src/app/shared-timesheet/interfaces';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';

export interface ViewModel{ 
    summaries: {[key: number]: TimesheetSummary}, 
    weekCriteria: WeekCriteria, 
    isXs: boolean, 
    navConfig: MainTopNavConfig 
}