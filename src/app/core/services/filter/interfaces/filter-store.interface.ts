import { Observable } from 'rxjs';
import { FilterViewConfig } from './filter-view-config.interface';

export interface FilterStore<TCriteria, TFilterConfig extends FilterViewConfig<TCriteria>>{
    filterConfig$: Observable<TFilterConfig>;

    addFilterCriteria(criteria: TCriteria): void;
}