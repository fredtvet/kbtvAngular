import { Prop } from '@shared-app/prop.type';
import { StateCurrentUser } from '@state/interfaces';

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

export interface State extends StateCurrentUser { 
    requestQueue: QueuedCommand[]; 
};

export interface OptimisticStateSelector<TState>{
    props: Prop<TState>[];
    strategy: "include" | "exclude";
}