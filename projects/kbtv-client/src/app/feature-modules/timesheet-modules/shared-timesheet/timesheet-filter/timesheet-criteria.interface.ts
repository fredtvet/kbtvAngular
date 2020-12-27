import { Mission, User } from '@core/models';
import { TimesheetStatus } from '@shared/enums/timesheet-status.enum';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { DateRange } from '@datetime/interfaces';

export interface TimesheetCriteria{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    dateRange?: DateRange; 
    dateRangePreset?: DateRangePresets;
}