import { _getUnixTimeSeconds } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management'
import { StoreState } from '../../interfaces';
import { LoginSuccessAction } from '../actions.const';

export const SetCredentialsReducer: Reducer<unknown, LoginSuccessAction> = _createReducer(
    LoginSuccessAction,
    (state: unknown, action: Immutable<LoginSuccessAction>): Partial<StoreState>=> {
        let {accessToken, refreshToken, user} = action.response;
        return {
            accessToken: accessToken?.token.replace("Bearer ", ""), 
            accessTokenExpiration: _getUnixTimeSeconds() + accessToken.expiresIn,
            refreshToken, 
            currentUser: user
        }
    }
)