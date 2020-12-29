
import { Immutable } from "global-types";
import { StateAction } from "state-management";
import { OptimisticHttpRequest } from "../interfaces";

export const OptimisticHttpAction = "HTTP_ACTION";
export interface OptimisticHttpAction extends StateAction {
    request: OptimisticHttpRequest, 
    stateSnapshot: Immutable<{}>
}