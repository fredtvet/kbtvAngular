import { StateAction } from 'state-management'

export const HttpErrorAction = "HTTP_ERROR_ACTION";
export interface HttpErrorAction extends StateAction {
    ignoreInitialError?: boolean, 
    customErrorTitle?: string,
}