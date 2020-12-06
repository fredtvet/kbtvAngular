import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { DataFilterConstructor } from 'src/app/shared/data.filter';
import { FilteredResponse } from 'src/app/shared/interfaces';

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