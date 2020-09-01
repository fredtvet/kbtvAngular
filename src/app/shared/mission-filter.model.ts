import { Mission } from '../core/models';
import { MissionFilterCriteria } from './interfaces';

export class MissionFilter {

    private checksCount: number = 0;

    constructor(public criteria: MissionFilterCriteria, private maxChecks?: number){}

    check(mission: Mission): boolean{ 
        if(!this.criteria) return true;
        if(!mission) return false;
        if(this.maxChecks && this.checksCount >= this.maxChecks) return false;
        
        let exp = true;

        if(this.criteria.finished != null)
            exp = exp && (mission.finished == null || mission.finished === this.criteria.finished);

        if(this.criteria.searchString)
            exp = exp && this.filterSearchString(mission);

        if(this.criteria.employerId)
            exp = exp && mission.employerId === this.criteria.employerId;

        if(this.criteria.missionTypeId)
            exp = exp && mission.missionTypeId === this.criteria.missionTypeId;

        if(exp && this.maxChecks) this.checksCount++; //if true, append checksCount

        return exp;
    }

    checkInitial(mission: Mission): boolean{
        let thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30);
        let exp = new Date(mission.updatedAt).getTime() >= thirtyDaysAgo; //Grab missions updated last 30 days
        exp = exp || new Date(mission.lastVisited).getTime() >= thirtyDaysAgo;//Grab missions visited last 30 days
        return exp;
    }

    private filterSearchString(m: Mission): boolean{
        let exp = m.address.toLowerCase().includes(this.criteria.searchString.toLowerCase());
        
        let id = +this.criteria.searchString;

        if(!isNaN(id)) exp = exp || m.id === id //Search by ID if number;

        return exp
    }  
       
};