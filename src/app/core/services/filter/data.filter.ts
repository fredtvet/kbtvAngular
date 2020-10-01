import { Prop } from 'src/app/shared-app/prop.type';

export abstract class DataFilter<TRecord, TCriteria>{

    activeCriteriaCount: number;

    private checksCount: number = 0;

    protected get isCriteriaEmpty(): boolean{ return !this.criteria }

    constructor(public readonly criteria: TCriteria, private maxChecks?: number, ignoreInital?: boolean){
        this.setActiveCriteriaCount(criteria);
        if(ignoreInital) 
            this.check = this.checkDefault
        else 
            this.check = this.isCriteriaEmpty ? this.checkInitial : this.checkDefault;
    }

    check: (record: TRecord) => boolean; 

    protected addChecks(record: TRecord): boolean{
        throw 'Method not implemented' 
    }

    protected addInitialChecks(record: TRecord): boolean{
        return true; 
    }

    protected activeCriteriaCountIgnoreCheck(value: any, key: Prop<TCriteria>): boolean{
        return false;
    }

    private setActiveCriteriaCount(criteria: TCriteria){
        switch(typeof criteria){
            case "string": this.activeCriteriaCount = this.isNullOrEmpty(criteria) ? 1 : 0; break;
            case "object": this.checkObjectCriteriaCount(criteria); break;
            default: this.activeCriteriaCount = criteria ? 1 : 0; break;
        }
    }

    private checkObjectCriteriaCount(criteria: TCriteria & Object){
        for(const key in criteria){
            const value = criteria[key];
            if(this.activeCriteriaCountIgnoreCheck(value, key as any)) continue;
            if(typeof value === "string" && !this.isNullOrEmpty(value)) this.addActiveCriteriaCount();
            else if(typeof value !== "string" && value != null) this.addActiveCriteriaCount();
        }
    }

    private addActiveCriteriaCount(){
        if(!this.activeCriteriaCount) this.activeCriteriaCount = 1;
        else this.activeCriteriaCount++;
    }

    private checkDefault = (record: TRecord): boolean => { 
        if(!record) return false;
        if(this.maxChecks && this.checksCount >= this.maxChecks) return false;
        
        let exp = true;

        exp = exp && this.addChecks(record);

        if(exp && this.maxChecks) this.checksCount++; //if true, append checksCount

        return exp;
    }

    private checkInitial = (record: TRecord): boolean => {
        return this.addInitialChecks(record);
    }

    private isNullOrEmpty(input: string): boolean{
        return input?.indexOf(' ') >= 0 || input === "";
    }
}