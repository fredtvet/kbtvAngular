import { HttpErrorResponse } from "@angular/common/http";
import { StateAction } from "state-management";

export const OptimisticHttpErrorAction = "OPTIMISTIC_HTTP_ERROR_ACTION"
/** Represents an action that occurs when there are http errors occuring on optimistic requests. */
export interface OptimisticHttpErrorAction extends StateAction {
    /** The error response from external api */
    httpError: HttpErrorResponse;   
    /** A list of cancel messages from the requests in the queue thats now canceled. */  
    optimisticErrors: string[];   
}   