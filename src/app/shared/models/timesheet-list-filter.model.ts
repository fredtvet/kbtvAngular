import { DateRangePresets } from '../enums/date-range-presets.enum';
import { TimesheetStatus } from '../enums/timesheet-status.enum';
import { TimesheetFilter } from '../interfaces/timesheet-filter.interface';
import { Timesheet } from '../interfaces/models/timesheet.interface';
import { Mission } from '../interfaces/models/mission.interface';


export class TimesheetListFilter implements TimesheetFilter {
    constructor(
        public status: TimesheetStatus = TimesheetStatus.Open,    
        public mission: Mission = undefined,    
        public dateRangePreset: DateRangePresets = DateRangePresets.CurrentYear,   
        public dateRange: Date[] = [],
        public userName: string = undefined,
    ){ }

    checkTimesheet(t: Timesheet): boolean{
        let exp = t.status == this.status;

        if(this.userName !== undefined)
            exp = exp && t.userName == this.userName;
            
        if(this.dateRange !== undefined && this.dateRange !== null) {
            let date = new Date(t.startTime);
            exp = exp && date >= this.dateRange[0] && date <= this.dateRange[1]; 
        }
    
        if(this.mission !== undefined && this.mission !== null) 
            exp = exp && t.missionId == this.mission.id;  
    
        return exp
      }
    

    
};
