import { Mission } from 'src/app/core/models';

export class MissionFilter{
    constructor(
        public searchString: string = undefined,    
        public showFinishedMissions: boolean = false,    
        public employerId: number = undefined,   
        public missionTypeId: number = undefined,
    ){ }

    checkMission(m: Mission): boolean{
        let exp = m.finished === this.showFinishedMissions;

        if(!this.isNullOrUndefined(this.searchString))
            exp = exp && this.filterSearchString(m);
        
        if(!this.isNullOrUndefined(this.employerId))
            exp = exp && m.employerId === this.employerId;

        if(!this.isNullOrUndefined(this.missionTypeId))
            exp = exp && m.missionTypeId === this.missionTypeId;

        return exp;
      }

    private filterSearchString(m: Mission): boolean{
        let exp = m.address.toLowerCase().includes(this.searchString.toLowerCase());
        
        let id = +this.searchString;

        if(!isNaN(id)) exp = exp || m.id === id //Search by ID if number;

        return exp
    }
    
    private isNullOrUndefined = (x: any) => (!x || x === null)
}