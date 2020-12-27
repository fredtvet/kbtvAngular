import { Observable } from 'rxjs';
import { Prop } from '@state/interfaces';
import { Immutable, ImmutableArray } from '@global/interfaces';

export interface ActiveStringFilterConfig<TRecord>{
    data: ImmutableArray<TRecord>;
    stringProps: Prop<Immutable<TRecord>>[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}