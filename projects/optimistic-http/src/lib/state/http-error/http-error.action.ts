import { HttpErrorResponse } from '@angular/common/http';
import { StateAction } from 'state-management'

export const HttpErrorAction = "HTTP_ERROR_ACTION";
export interface HttpErrorAction extends StateAction {
    httpError: HttpErrorResponse,
}