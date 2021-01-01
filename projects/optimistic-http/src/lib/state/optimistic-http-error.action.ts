import { HttpErrorResponse } from "@angular/common/http";
import { StateAction } from "state-management";

export const OptimisticHttpErrorAction = "OPTIMISTIC_HTTP_ERROR_ACTION"
export interface OptimisticHttpErrorAction extends StateAction {
    httpError: HttpErrorResponse;     
    optimisticErrors: string[];   
}   