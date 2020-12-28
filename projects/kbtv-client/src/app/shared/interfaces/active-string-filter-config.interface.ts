import { Observable } from 'rxjs';
import { Immutable, ImmutableArray, Prop } from 'global-types';

export interface ActiveStringFilterConfig<TRecord>{
    data: ImmutableArray<TRecord>;
    stringProps: Prop<Immutable<TRecord>>[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}