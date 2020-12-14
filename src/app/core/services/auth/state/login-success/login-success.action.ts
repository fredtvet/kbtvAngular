import { User } from '@core/models';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { LoginResponse } from '../../interfaces';

export class LoginSuccessAction extends StateAction { 
    constructor(
        public response: LoginResponse,
        public previousUser?: Immutable<User>,
        public returnUrl?: string
    ){ super() }   
}