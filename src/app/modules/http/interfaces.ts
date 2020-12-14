import { Immutable } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';

export interface FormDataEntry { name: string, value: string | Blob }

export interface HttpRequest { 
    apiUrl: string; 
    method: "POST" | "PUT" | "DELETE"; 
    body: Object | FormDataEntry[]; 
    cancelMessage?: string; 
};

export interface QueuedCommand { 
    request: Immutable<HttpRequest>, 
    stateSnapshot: Immutable<Object>, 
    dispatched?: boolean 
};

export interface StateRequestQueue { 
    requestQueue: QueuedCommand[]; 
};

export interface OptimisticStateSelector<TState>{
    props: Prop<TState>[];
    strategy: "include" | "exclude";
}