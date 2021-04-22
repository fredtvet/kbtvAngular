import { HttpErrorResponse } from '@angular/common/http';
import { StateAction } from 'state-management'

export const HttpErrorAction = "HTTP_ERROR_ACTION";
/** Represents the action dispatched when there are http errors returned from optimistic requests.
 *  Triggers the {@link OptimisticHttpError} action. */
export interface HttpErrorAction extends StateAction<typeof HttpErrorAction> {
    /** The error response from the external api */
    httpError: HttpErrorResponse,
}