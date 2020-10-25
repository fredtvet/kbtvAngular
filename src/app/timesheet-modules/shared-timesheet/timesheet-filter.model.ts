import { Timesheet } from 'src/app/core/models';
import { ModelStateConfig } from 'src/app/core/services/model/model-state.config';
import { DataFilter } from 'src/app/shared/data.filter';
import { DateRange } from 'src/app/shared/interfaces/date-range.interface';
import { TimesheetCriteria } from './interfaces/timesheet-criteria.interface';

export class TimesheetFilter extends DataFilter<Timesheet, TimesheetCriteria>{

    constructor(criteria: TimesheetCriteria, maxChecks?: number){ super(criteria, maxChecks);}

    protected addChecks(record: Timesheet): boolean {
        let exp = true;
        if(!this.criteria.dateRange) return false;
        if(this.criteria.status){
            exp = exp && record.status === this.criteria.status;
        }
        if(this.criteria.user?.userName)
            exp = exp && record.userName === this.criteria.user.userName;

        if(this.criteria.dateRange && this.criteria.dateRange.start && this.criteria.dateRange.end) {
            let startTime = this.getStartOfDayTime(record.startTime);
            exp = exp && startTime >= this.getStartOfDayTime(this.criteria.dateRange.start) 
                && startTime <= this.getStartOfDayTime(this.criteria.dateRange.end); 
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
            const baseValue = baseCriteria[prop];
            if(!baseValue) continue; 
            const value =  this.criteria[prop];
            if(value && typeof value === "object") {
                if(!this.isObjectContainedIn(baseValue, prop)) return false;
            }
            else if(value !== baseValue) return false;     
        }
        return true;
    }
    
    private isObjectContainedIn(baseValue: Object, prop: string){
        const modelCfg = ModelStateConfig.getBy(prop, "foreignProp");
        const value = this.criteria[prop];

        if(modelCfg && value[modelCfg.identifier] !== baseValue[modelCfg.identifier]) 
            return false

        else if(!modelCfg && value !== baseValue) return false;
        
        return true
    }

    private isDateRangeContainedIn(baseDateRange: DateRange): boolean{
        if(!baseDateRange || !baseDateRange.end || !baseDateRange.start) return false; //No range means all, in which it will always be contained. 
        const dateRange = this.criteria.dateRange;
        if(!dateRange || !dateRange.start || !dateRange.end) return true; 
        return (this.getStartOfDayTime(baseDateRange.start) <= this.getStartOfDayTime(dateRange.start)) && 
        (this.getStartOfDayTime(baseDateRange.end) >= this.getStartOfDayTime(dateRange.end))
    }

    private getStartOfDayTime(date: Date | string | number): number{
        if(!date) return
        const newDate = new Date(date);
        newDate.setHours(0,0,0,0);
        return newDate.getTime();
    }

};