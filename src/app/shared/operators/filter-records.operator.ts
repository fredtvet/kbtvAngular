import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _filter } from '@array/filter.helper';
import { DataFilterConstructor } from '@shared/data.filter';
import { FilteredResponse } from '@shared/interfaces';
import { Immutable, ImmutableArray } from '@immutable/interfaces';

type Response<TRecord, TCriteria> = FilteredResponse<Immutable<TCriteria>, Immutable<TRecord>>;

export const filterRecords = <TRecord, TCriteria>(filterType: DataFilterConstructor<TCriteria>, ...filterArgs: any[]) => 
    (source: Observable<[ImmutableArray<TRecord>, Immutable<TCriteria>]> ): Observable<Response<TRecord, TCriteria>> => 
        source.pipe(
            map(([timesheets, criteria]) => {
                if(!criteria) return <Response<TRecord, TCriteria>>{criteria: null, records: null};
                const filter = new filterType(criteria, ...filterArgs);
                return <Response<TRecord, TCriteria>>{
                    criteria,
                    records: _filter(timesheets, (entity) => filter.check(entity)),
                };
            }), 
        )