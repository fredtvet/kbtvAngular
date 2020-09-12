import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { Injectable } from '@angular/core';
import { DataFilter } from './data.filter';

@Injectable({providedIn: "root"})
export class FilterStateHelper{

    constructor(private arrayHelperService: ArrayHelperService){}

    filter<TModel,TCriteria>(
        entities: TModel[],
        criteria: TCriteria,
        filterType: new (criteria: TCriteria, maxChecks: number, ignoreInitial: boolean) => DataFilter<TModel, TCriteria>,
        maxChecks?: number,
        ignoreInitial?: boolean
    ): TModel[]{       
        const filter = new filterType(criteria, maxChecks, ignoreInitial);
        return this.arrayHelperService.filter(entities, (entity) => filter.check(entity))
    }             
    
}   
