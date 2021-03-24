import { Immutable, Prop } from 'global-types';
import { Observable } from 'rxjs';

export interface ActiveStringFilterConfig<TRecord>{
    stringProps: Prop<Immutable<TRecord>>[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}