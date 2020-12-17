import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { Immutable } from '@global/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StoreState } from '../../interfaces/store-state';
import { LoginSuccessAction } from './login-success.action';

export const SetCredentialsReducer = _createReducer(
    LoginSuccessAction,
    (state: unknown, action: Immutable<LoginSuccessAction>): Partial<StoreState>=> {
        let {accessToken, refreshToken, user} = action.response;
        return {
            accessToken: {...accessToken,
                expiresIn: _getUnixTimeSeconds() + accessToken.expiresIn,
                token: accessToken?.token.replace("Bearer ", "")
            }, 
            refreshToken, 
            currentUser: user
        }
    }
)