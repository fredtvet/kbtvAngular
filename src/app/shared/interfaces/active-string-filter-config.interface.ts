import { Observable } from 'rxjs';
import { Prop } from '@state/interfaces/prop.type';

export interface ActiveStringFilterConfig<TRecord>{
    data: TRecord[];
    stringProps: Prop<TRecord>[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}