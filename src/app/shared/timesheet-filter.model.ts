import { Timesheet } from '../core/models';
import { TimesheetCriteria } from '../shared-app/interfaces';

export class TimesheetFilter {
    constructor(public criteria: TimesheetCriteria){ }

    check(t: Timesheet): boolean {
        let exp = true;
        if(!this.criteria) return false;

        if(this.criteria.status || this.criteria.status === 0){
            exp = exp && t.status === this.criteria.status;
        }
        if(this.criteria.userName)
            exp = exp && t.userName === this.criteria.userName;

        if(this.criteria.dateRange && this.criteria.dateRange.length > 1) {
            let startTime = new Date(t.startTime).getTime();
            exp = exp && startTime >= new Date(this.criteria.dateRange[0]).getTime() && startTime <= new Date(this.criteria.dateRange[1]).getTime(); 
        }
    
        if(this.criteria.mission) 
            exp = exp && t.missionId === this.criteria.mission.id;  
    
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
        if(!dateRange || dateRange.length < 2) return false; 
        return (baseDateRange[0].getTime() <= dateRange[0].getTime()) && (baseDateRange[1].getTime() >= dateRange[1].getTime())
    }
       
};