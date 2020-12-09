import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _filter } from '@array/filter.helper';
import { DataFilterConstructor } from '@shared/data.filter';
import { FilteredResponse } from '@shared/interfaces';

export const filterRecords = <TRecord, TCriteria>(filterType: DataFilterConstructor<TCriteria>, ...filterArgs: any[]) => 
    (source: Observable<[TRecord[], TCriteria]> ): Observable<FilteredResponse<TCriteria, TRecord>> => 
        source.pipe(
            map(([timesheets, criteria]) => {
                if(!criteria) return {criteria: null, records: null};
                const filter = new filterType(criteria, ...filterArgs);
                return {
                    criteria,
                    records: _filter(timesheets, (entity) => filter.check(entity)),
                };
            }), 
        )