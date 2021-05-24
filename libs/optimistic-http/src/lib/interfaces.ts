import { Immutable, Maybe, UnknownState } from 'global-types';
import { StateAction } from 'state-management';

export interface QueuedCommand { 
    request: Immutable<OptimisticHttpRequest>, 
    stateSnapshot: Maybe<Immutable<UnknownState>>, 
    dispatched?: boolean,
    commandId: string
};

/** Represents a completed command with a status indicating if the command succeeded. */
export interface CompletedCommand { 
    request: Immutable<OptimisticHttpRequest>, 
    succeeded: boolean;
    commandId?: string;
};

/** Represents a slice of state containing the request queue */
export interface StateRequestQueue { 
    requestQueue: QueuedCommand[]; 
};

/** Represents a slice of state containing the request log of previus requests and their statuses*/
export interface StateRequestLog { 
    requestLog: CompletedCommand[]; 
};

/** Describes an object thats used to represent an entry in a form data class. */
export interface FormDataEntry { 
    /** The key of the entry */
    name: string, 
    /** The value of the entry */
    value: string | Blob 
}

/** Describes an object used to make optimistic http requests. */
export interface OptimisticHttpRequest<TBody extends {} | FormData[] | null = {} | FormData[] | null> { 
    /** The url suffix of the api endpoint. 
     * Gets appended to base url provided with {@link OPTIMISTIC_BASE_API_URL} */
    apiUrl: string; 
    /** The http method of the request */
    method: "POST" | "PUT" | "DELETE"; 
    /** The body of the http request */
    body?: TBody;   
    /** The action that initiated the request.  */
    callerAction?: StateAction;
};

/** A map of actions that should dispatch an optimistic http request. 
 *  Provided with token {@link ACTION_REQUEST_MAP} or with the forRoot & forFeature functions on {@link OptimisticHttpModule} */
export type ActionRequestMap<TActionTypes extends string> = 
  { [P in TActionTypes]: ActionRequestConverterFn<ActionWithType<P>> }

export type ActionRequestConverterFn<TAction> = (a: Immutable<TAction>) => Omit<OptimisticHttpRequest<any>, "callerAction">

/** Represents a type that can be serialized. No functions are allowed. */
export type AsJson<T> = 
  T extends string | number | boolean | null ? T : 
  T extends Function ? never : 
  T extends object ? { [K in keyof T]: AsJson<T[K]> } : 
  never;

/** Represents a state action with type equivalent to generic TCommands provided */
export type ActionWithType<TCommands> = Omit<StateAction, 'type'> & {type: TCommands};