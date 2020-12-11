import { StateAction } from '@state/state.action';

export class UpdatePasswordAction extends StateAction {
    constructor(
        public oldPassword: string, 
        public newPassword: string
    ){ super() }
}