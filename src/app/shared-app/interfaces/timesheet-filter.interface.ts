import { Mission, User } from 'src/app/core/models';
import { TimesheetStatus } from 'src/app/shared-app/enums/timesheet-status.enum';
import { DateRangePresets } from 'src/app/shared-app/enums/date-range-presets.enum';




export interface TimesheetFilter{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    userName?: string;
    dateRange?: Date[]; 
    dateRangePreset?: DateRangePresets;
}