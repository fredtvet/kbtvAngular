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

export interface QueuedCommand { 
    request: Immutable<OptimisticHttpRequest>, 
    stateSnapshot: Maybe<Immutable<UnknownState>>, 
    dispatched?: boolean,
    commandId?: string
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

/** Represents an object used to select what state is optimistic.
 *  Provided with the token {@link OPTIMISTIC_STATE_SELECTOR}
 * @remarks Optimistic state is reverted when errors occur in the requests. */
export interface OptimisticStateSelector<TState>{
    /** The props that should be included / excluded */
    props: Prop<TState>[];
    /** If set to 'exclude', all state except the props specified are treated optimistically.
     *  If set to 'include', only the props specified are treated optimistically. */
    strategy: "include" | "exclude";
}

/** Represents information neccesary to track the last command from the previous session. */
export interface LastCommand{
    lastCommandId: string;
    lastCommandStatus: boolean;
}