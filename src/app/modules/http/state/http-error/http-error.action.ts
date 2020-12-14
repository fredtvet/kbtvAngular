import { StateAction } from '@state/state.action';

export const HttpErrorAction = "HTTP_ERROR_ACTION";
export interface HttpErrorAction extends StateAction {
    ignoreInitialError?: boolean, 
    customErrorTitle?: string,
}