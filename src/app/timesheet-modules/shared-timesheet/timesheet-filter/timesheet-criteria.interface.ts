import { Mission, User } from 'src/app/core/models';
import { TimesheetStatus } from 'src/app/shared/enums/timesheet-status.enum';
import { DateRangePresets } from 'src/app/shared-app/enums/date-range-presets.enum';
import { DateRange } from 'src/app/shared/interfaces/date-range.interface';

export interface TimesheetCriteria{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    dateRange?: DateRange; 
    dateRangePreset?: DateRangePresets;
}