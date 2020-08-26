import { Mission } from 'src/app/core/models';
import { MissionFilterCriteria } from './interfaces/mission-filter-criteria.interface';

export class MissionFilter {
    constructor(public criteria: MissionFilterCriteria){}

    check(mission: Mission): boolean{ 
        if(this.isNullOrUndefined(this.criteria)) return true;
        if(this.isNullOrUndefined(mission)) return false;
        
        let exp = true;

        if(!this.isNullOrUndefined(this.criteria.finished))
            exp = exp && mission.finished === this.criteria.finished;

        if(!this.isNullOrUndefined(this.criteria.searchString))
            exp = exp && this.filterSearchString(mission);
        
        if(!this.isNullOrUndefined(this.criteria.employerId))
            exp = exp && mission.employerId === this.criteria.employerId;

        if(!this.isNullOrUndefined(this.criteria.missionTypeId))
            exp = exp && mission.missionTypeId === this.criteria.missionTypeId;

        return exp;
      }

    private filterSearchString(m: Mission): boolean{
        let exp = m.address.toLowerCase().includes(this.criteria.searchString.toLowerCase());
        
        let id = +this.criteria.searchString;

        if(!isNaN(id)) exp = exp || m.id === id //Search by ID if number;

        return exp
    }
    
    private isNullOrUndefined = (x: any) => (x === undefined || x === null)
}