import { Prop } from '@state/interfaces/prop.type';

export interface HttpRequest { 
    apiUrl: string; 
    method: "POST" | "PUT" | "DELETE"; 
    body: any; 
    cancelMessage?: string; 
};

export interface QueuedCommand { 
    request: HttpRequest, 
    stateSnapshot: Readonly<any>, 
    dispatched?: boolean 
};

export interface StateRequestQueue { 
    requestQueue: QueuedCommand[]; 
};

export interface OptimisticStateSelector<TState>{
    props: Prop<TState>[];
    strategy: "include" | "exclude";
}