import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SorterService {

    constructor(){}

    sort<T>(collection: T[], prop: string, direction: "asc" | "desc" = "desc"): void {
        if(!collection || collection === null) return;
        collection.sort((a: any, b: any) => {
            if(!a[prop]) return 1;
            if(!b[prop]) return -1;
            
            let aVal: any = a[prop];
            let bVal: any  = b[prop];

            // Fix issues that spaces before/after string value can cause such as ' San Francisco'
            if (this.isString(aVal)) { aVal = aVal.trim().toUpperCase(); }
            if (this.isString(bVal)) { bVal = bVal.trim().toUpperCase(); }

            if(direction === "asc") return aVal - bVal;
            else return bVal - aVal;
        });
    }

    sortByDate<T>(collection: T[], prop: string, direction: "asc" | "desc" = "desc"): void{
        if(!collection || collection === null) return;
        collection.sort((a: any, b: any) => {
            if(!a[prop]) return 1;
            if(!b[prop]) return -1;

            let aVal: Date = new Date(a[prop]);
            let bVal: Date = new Date(b[prop]);

            if(direction === "asc") return aVal.getTime() - bVal.getTime();
            else return bVal.getTime() - aVal.getTime();
        });
    }

    isString(val: any): boolean {
      return (val && (typeof val === 'string' || val instanceof String));
    }

}