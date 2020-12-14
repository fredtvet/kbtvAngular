import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StoreState } from '../../interfaces/store-state';
import { LoginSuccessAction } from './login-success.action';

export const SetCredentialsReducer = _createReducer(
    LoginSuccessAction,
    (state: any, action: LoginSuccessAction): Partial<StoreState>=> {
        let {accessToken, refreshToken, user} = action.response;
        accessToken.expiresIn = _getUnixTimeSeconds() + accessToken.expiresIn;
        accessToken.token = accessToken?.token.replace("Bearer ", "")
        return {accessToken, refreshToken, currentUser: user}
    }
)