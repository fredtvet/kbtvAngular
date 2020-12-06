import { StateAction } from 'src/app/state/interfaces';

export const HttpErrorActionId = "HTTP_ERROR"

export interface HttpErrorCommand extends StateAction {
    ignoreInitialError?: boolean, 
    customErrorTitle?: string,
}