import { Immutable, Maybe, Prop, UnknownState } from 'global-types';

/** Describes an object thats used to represent an entry in a form data class. */
export interface FormDataEntry { 
    /** The key of the entry */
    name: string, 
    /** The value of the entry */
    value: string | Blob 
}

/** Describes an object used to make optimistic http requests. */
export interface OptimisticHttpRequest<TOptions extends Object = {}> { 
    /** The url suffix of the api endpoint. 
     * Gets appended to base url provided with {@link BASE_API_URL} */
    apiUrl: string; 
    /** The http method of the request */
    method: "POST" | "PUT" | "DELETE"; 
    /** The body of the http request */
    body: {} | FormDataEntry[] | null | undefined;   
    /** Additional options to associate with the request */
    options?: TOptions;
};

export interface QueuedCommand<TOptions = {}> { 
    request: Immutable<OptimisticHttpRequest<TOptions>>, 
    stateSnapshot: Maybe<Immutable<UnknownState>>, 
    dispatched?: boolean,
    commandId?: string
};

/** Represents a completed command with a status indicating if the command succeeded. */
export interface CompletedCommand<TOptions = {}> { 
    request: Immutable<OptimisticHttpRequest<TOptions>>, 
    succeeded: boolean;
    commandId?: string;
};

/** Represents a slice of state containing the request queue */
export interface StateRequestQueue<TOptions = {}> { 
    requestQueue: QueuedCommand<TOptions>[]; 
};

/** Represents a slice of state containing the request log of previus requests and their statuses*/
export interface StateRequestLog<TOptions = {}> { 
    requestLog: CompletedCommand<TOptions>[]; 
};

/** Represents information neccesary to track the last command from the previous session. */
export interface LastCommand{
    lastCommandId: string;
    lastCommandStatus: boolean;
}