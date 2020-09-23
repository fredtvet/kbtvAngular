import { Mission } from 'src/app/core/models';
import { TimesheetStatus } from 'src/app/shared/enums/timesheet-status.enum';
import { DateRangePresets } from 'src/app/shared-app/enums/date-range-presets.enum';

export interface TimesheetCriteria{
    status?: TimesheetStatus;    
    mission?: Mission;
    userName?: string;
    dateRange?: Date[]; 
    dateRangePreset?: DateRangePresets;
}