import { StateAction } from '@state/state.action'

export class LogoutAction extends StateAction { 
    constructor(
        public refreshToken?: string, 
        public returnUrl?: string
    ){ super() } 
}