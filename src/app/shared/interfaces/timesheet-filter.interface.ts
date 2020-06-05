import { TimesheetStatus } from '../enums/timesheet-status.enum';
import { DateRangePresets } from '../enums/date-range-presets.enum';
import { User } from './models/user.interface';
import { Mission } from './models/mission.interface';


export interface TimesheetFilter{
    status?: TimesheetStatus;    
    mission?: Mission;
    user?: User;
    userName?: string;
    dateRange?: Date[]; 
    dateRangePreset?: DateRangePresets;
}