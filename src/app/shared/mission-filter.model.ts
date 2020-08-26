import { Mission } from '../core/models';

export class MissionFilter {
    constructor(public criteria: string){ }

    check(m: Mission): boolean {
        if(!this.criteria) return this.filterInitialMission(m);
        let exp = m.address.toLowerCase().includes(this.criteria.toLowerCase());
        const id = +this.criteria;
        if(!isNaN(id)) exp = exp || m.id === id //If search input is number, include id search
        return exp;
    }
    
    private filterInitialMission(mission: Mission): boolean{
        let thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30);
        let exp = new Date(mission.updatedAt).getTime() >= thirtyDaysAgo; //Grab missions updated last 30 days
        exp = exp || new Date(mission.lastVisited).getTime() >= thirtyDaysAgo;//Grab missions visited last 30 days
        return exp;
    }
       
};