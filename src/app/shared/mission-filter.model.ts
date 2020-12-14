import { Mission } from '../core/models';
import { MissionCriteria } from './interfaces';
import { DataFilter } from './data.filter';
import { Immutable } from '@immutable/interfaces';

export class MissionFilter extends DataFilter<Mission, MissionCriteria>{

    protected get isCriteriaEmpty(): boolean{
        return !this.criteria || 
            (this.criteria.finished == null && !this.criteria.searchString && !this.criteria.employer && !this.criteria.missionType)
    }

    private searchStringLower: string;
    private sixtyDaysAgo: number;

    constructor(criteria: Immutable<MissionCriteria>, maxChecks?: number, ignoreInitial?: boolean){
        super(criteria, maxChecks, ignoreInitial);
        this.searchStringLower = criteria?.searchString?.toLowerCase();
        if(this.isCriteriaEmpty) this.sixtyDaysAgo = new Date().setDate(new Date().getDate() - 60);
    }

    protected addChecks(mission: Immutable<Mission>): boolean{
        let exp = true;

        if(this.criteria.finished != null)
            exp = exp && ((mission.finished === this.criteria.finished) || (!mission.finished && this.criteria.finished === false));

        if(this.criteria.searchString)
            exp = exp && this.filterSearchString(mission);

        if(this.criteria.employer?.id)
            exp = exp && mission.employerId === this.criteria.employer.id;

        if(this.criteria.missionType?.id)
            exp = exp && mission.missionTypeId === this.criteria.missionType.id;

        return exp;
    }

    protected addInitialChecks(mission: Immutable<Mission>): boolean{
        let exp = mission.updatedAt >= this.sixtyDaysAgo; //Grab missions updated last 30 days
        exp = exp || mission.lastVisited >= this.sixtyDaysAgo;//Grab missions visited last 30 days
        return exp;
    }
    
    private filterSearchString(m: Immutable<Mission>): boolean{
        return m.address.toLowerCase().includes(this.searchStringLower) || 
            m.id.includes(this.searchStringLower);
    }   
       
};