import { StateAction } from '@state/state.action';

export class HttpErrorAction extends StateAction {
    constructor(
        public ignoreInitialError?: boolean, 
        public customErrorTitle?: string,
    ){ super() }
}