import { Immutable, Maybe, UnknownState } from '@global/interfaces';
import { Prop } from '@state/interfaces';

export interface FormDataEntry { name: string, value: string | Blob }

export interface HttpRequest { 
    apiUrl: string; 
    method: "POST" | "PUT" | "DELETE"; 
    body: {} | FormDataEntry[] | null | undefined; 
    cancelMessage?: string; 
};

export interface QueuedCommand { 
    request: Immutable<HttpRequest>, 
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