import { Mission, User } from '@core/models';
import { TimesheetStatus } from '@shared/enums/timesheet-status.enum';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { DateRange } from 'date-time-helpers';

export interface TimesheetCriteria{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    dateRange?: DateRange; 
    dateRangePreset?: DateRangePresets;
}