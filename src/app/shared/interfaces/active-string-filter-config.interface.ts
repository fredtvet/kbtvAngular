import { Observable } from 'rxjs';

export interface ActiveStringFilterConfig<TRecord>{
    data: TRecord[];
    stringProps: (keyof TRecord)[];  
    stringChanges$: Observable<string>;
    initialString?: string;
    maxChecks?: number;
    customDebounceTime?: number;
}