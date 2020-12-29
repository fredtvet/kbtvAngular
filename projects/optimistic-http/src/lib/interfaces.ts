import { Immutable, Maybe, UnknownState, Prop } from 'global-types';

export interface FormDataEntry { name: string, value: string | Blob }

export interface OptimisticHttpRequest { 
    apiUrl: string; 
    method: "POST" | "PUT" | "DELETE"; 
    body: {} | FormDataEntry[] | null | undefined; 
    cancelMessage?: string; 
};

export interface QueuedCommand { 
    request: Immutable<OptimisticHttpRequest>, 
    stateSnapshot: Maybe<Immutable<UnknownState>>, 
    dispatched?: boolean 
};

export interface StateRequestQueue { 
    requestQueue: QueuedCommand[]; 
};

export interface OptimisticStateSelector<TState>{
    props: Prop<TState>[];
    strategy: "include" | "exclude";
}