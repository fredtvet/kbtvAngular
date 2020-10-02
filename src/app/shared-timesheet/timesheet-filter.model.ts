import { Timesheet } from '../core/models';
import { DataFilter } from '../core/services/filter/data.filter';
import { Prop } from '../shared-app/prop.type';
import { TimesheetCriteria } from './interfaces/timesheet-criteria.interface';

export class TimesheetFilter extends DataFilter<Timesheet, TimesheetCriteria>{

    constructor(criteria: TimesheetCriteria, maxChecks?: number){ super(criteria, maxChecks); }

    protected addChecks(record: Timesheet): boolean {
        let exp = true;
        if(this.criteria.status || this.criteria.status === 0){
            exp = exp && record.status === this.criteria.status;
        }
        if(this.criteria.user?.userName)
            exp = exp && record.userName === this.criteria.user.userName;

        if(this.criteria.dateRange && this.criteria.dateRange.length > 1) {
            let startTime = this.getStartOfDayTime(record.startTime);
            exp = exp && startTime >= this.getStartOfDayTime(this.criteria.dateRange[0]) 
                && startTime <= this.getStartOfDayTime(this.criteria.dateRange[1]); 
        }
    
        if(this.criteria.mission) 
            exp = exp && record.missionId === this.criteria.mission.id;  
    
        return exp
    }

    //Check if criteria is contained in base, meaning all potential timesheets has already been fetched. 
    containedIn(baseCriteria: TimesheetCriteria): boolean{
        if(!this.criteria) return true;
        if(!baseCriteria) return false;
        if(!this.isDateRangeContainedIn(baseCriteria.dateRange)) return false;
        for(const prop in this.criteria){
            if(prop === "dateRange" || prop === "dateRangePreset") continue;
            if(baseCriteria[prop] && this.criteria[prop] !== baseCriteria[prop]) return false;
        }
        return true;
    }

    private isDateRangeContainedIn(baseDateRange: Date[]): boolean{
        if(!baseDateRange || baseDateRange.length < 2) return true; //No range means all, in which it will always be contained. 
        const dateRange = this.criteria.dateRange;
        if(!dateRange) return true; 
        if(dateRange.length < 2) return false; 
        return (this.getStartOfDayTime(baseDateRange[0]) <= this.getStartOfDayTime(dateRange[0])) && 
        (this.getStartOfDayTime(baseDateRange[1]) >= this.getStartOfDayTime(dateRange[1]))
    }

    private getStartOfDayTime(date: Date | string | number): number{
        if(!date) return
        const newDate = new Date(date);
        newDate.setHours(0,0,0,0);
        return newDate.getTime();
    }

    protected activeCriteriaCountIgnoreCheck(value: any, key: Prop<TimesheetCriteria>): boolean{
        return key === "dateRangePreset"    
    } 
};