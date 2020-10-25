import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';

export interface ViewModel{ 
    summaries: {[key: number]: TimesheetSummary}, 
    weekCriteria: WeekCriteria, 
    isXs: boolean, 
    navConfig: MainTopNavConfig 
}