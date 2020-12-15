import { Immutable } from '@immutable/interfaces';

export type DataFilterConstructor<TCriteria>  = 
    new (criteria: Immutable<TCriteria>, ...args: unknown[]) => DataFilter<Immutable<unknown>, Immutable<TCriteria>>;

export abstract class DataFilter<TRecord, TCriteria>{

    private checksCount: number = 0;

    protected get isCriteriaEmpty(): boolean{ return !this.criteria }

    criteria: Immutable<Partial<TCriteria>>;

    constructor(criteria: Immutable<TCriteria>, private maxChecks?: number, ignoreInital?: boolean){
        this.criteria = criteria || {} as Immutable<Partial<TCriteria>>;
        if(ignoreInital) 
            this.check = this.checkDefault
        else 
            this.check = this.isCriteriaEmpty ? this.checkInitial : this.checkDefault;
    }

    check: (record: Immutable<TRecord>) => boolean; 

    protected addChecks(record: Immutable<TRecord>): boolean{
        console.error("Method not implemented");
        return null;
    }

    protected addInitialChecks(record: Immutable<TRecord>): boolean{
        return true; 
    }

    private checkDefault = (record: Immutable<TRecord>): boolean => { 
        if(!record) return false;
        if(this.maxChecks && this.checksCount >= this.maxChecks) return false;
        
        let exp = true;

        exp = exp && this.addChecks(record);

        if(exp && this.maxChecks) this.checksCount++; //if true, append checksCount

        return exp;
    }

    private checkInitial = (record: Immutable<TRecord>): boolean => {
        return this.addInitialChecks(record);
    }

}