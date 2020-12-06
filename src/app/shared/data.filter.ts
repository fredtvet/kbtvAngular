export type DataFilterConstructor<TCriteria>  = 
    new (criteria: TCriteria, ...args: any[]) => DataFilter<any, TCriteria>;

export abstract class DataFilter<TRecord, TCriteria>{

    private checksCount: number = 0;

    protected get isCriteriaEmpty(): boolean{ return !this.criteria }

    criteria: TCriteria;

    constructor(criteria: TCriteria, private maxChecks?: number, ignoreInital?: boolean){
        this.criteria = criteria || {} as any;
        if(ignoreInital) 
            this.check = this.checkDefault
        else 
            this.check = this.isCriteriaEmpty ? this.checkInitial : this.checkDefault;
    }

    check: (record: TRecord) => boolean; 

    protected addChecks(record: TRecord): boolean{
        console.error("Method not implemented");
        return null;
    }

    protected addInitialChecks(record: TRecord): boolean{
        return true; 
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

}