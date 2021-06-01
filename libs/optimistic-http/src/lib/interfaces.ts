import { Immutable, Maybe, UnknownState } from 'global-types';
import { StateAction } from 'state-management';

export interface QueuedCommand { 
    request: OptimisticHttpRequest, 
    stateSnapshot: Maybe<UnknownState>, 
    dispatched?: boolean,
};

/** Represents a completed command with a status indicating if the command succeeded. */
export interface CompletedCommand { 
    request: Immutable<OptimisticHttpRequest>, 
    succeeded: boolean;
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

export type OptimisticHttpHeaders = {[key: string]: string | string[]};

/** Describes an object used to make optimistic http requests. */
export interface OptimisticHttpRequest { 
    /** The url suffix of the api endpoint. 
     * Gets appended to base url provided with {@link OPTIMISTIC_BASE_API_URL} */
    apiUrl: string; 
    /** The http method of the request */
    method: "POST" | "PUT" | "DELETE"; 
    /** The body of the http request */
    body?: {} | FormData[] | null;   
    /** The headers of the http request */
    headers?: OptimisticHttpHeaders;
};

/** A map of actions that should dispatch an optimistic http request. 
 *  Provided with token {@link ACTION_REQUEST_MAP} or with the forRoot & forFeature functions on {@link OptimisticHttpModule} */
 export declare type ActionRequestMap<TActions extends StateAction> = {
    [P in TActions as P['type']]: ActionRequestConverterFn<P>;
};

export type ActionRequestConverterFn<TAction> = (a: Immutable<TAction>) => OptimisticHttpRequest

/** Represents a type that can be serialized. No functions are allowed. */
export type AsJson<T> = 
  T extends string | number | boolean | null ? T : 
  T extends Function ? never : 
  T extends object ? { [K in keyof T]: AsJson<T[K]> } : 
  never;

/** Represents a state action with type equivalent to generic TCommands provided */
export type ActionWithType<TCommands> = Omit<StateAction, 'type'> & {type: TCommands};