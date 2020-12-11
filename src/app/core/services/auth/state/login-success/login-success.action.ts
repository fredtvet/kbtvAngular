import { User } from '@core/models';
import { StateAction } from '@state/state.action';
import { LoginResponse } from '../../interfaces';

export class LoginSuccessAction extends StateAction { 
    constructor(
        public response: LoginResponse,
        public previousUser?: User,
        public returnUrl?: string
    ){ super() }   
}