import { DateRangePresets } from '../shared-app/enums/date-range-presets.enum';
import { Timesheet } from '../core/models/timesheet.interface';
import { Mission } from '../core/models/mission.interface';
import { TimesheetFilter } from '../shared-app/interfaces';
import { TimesheetStatus } from '../shared-app/enums';


export class TimesheetListFilter implements TimesheetFilter {
    constructor(
        public status: TimesheetStatus = TimesheetStatus.Open,    
        public mission: Mission = undefined,    
        public dateRangePreset: DateRangePresets = DateRangePresets.Custom,   
        public dateRange: Date[] = [],
        public userName: string = undefined,
    ){ }

    checkTimesheet(t: Timesheet): boolean {
        let exp = t.status === this.status;

        if(this.userName && this.userName !== null)
            exp = exp && t.userName === this.userName;
            
        if(this.dateRange && this.dateRange !== null) {
            let date = new Date(t.startTime);
            exp = exp && date >= this.dateRange[0] && date <= this.dateRange[1]; 
        }
    
        if(this.mission && this.mission !== null) 
            exp = exp && t.missionId === this.mission.id;  
    
        return exp
      }
       
};
