import { Observable } from 'rxjs';
import { Prop } from 'src/app/core/model/state.types';

export interface ActiveStringFilterConfig<TRecord>{
    data: TRecord[];
    stringProps: Prop<TRecord>[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}