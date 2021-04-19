
import { Immutable } from "global-types";
import { StateAction } from "state-management";
import { OptimisticHttpRequest } from "../interfaces";

export const OptimisticHttpAction = "HTTP_ACTION";

/** Represents an action used to make an optimistic http request. */
export interface OptimisticHttpAction extends StateAction {
    /** The request that should be sent */
    request: OptimisticHttpRequest, 
    /** A snapshot that is used to revert state in case of errors. */
    stateSnapshot: Immutable<{}>
}