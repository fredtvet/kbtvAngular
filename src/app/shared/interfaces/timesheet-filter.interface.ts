import { TimesheetStatus } from '../enums/timesheet-status.enum';
import { Mission } from '../models/mission.model';
import { DateRangePresets } from '../enums/date-range-presets.enum';
import { User } from '../models/user.model';

export interface TimesheetFilter{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    userName?: string;
    dateRange?: Date[]; 
    dateRangePreset?: DateRangePresets;
}