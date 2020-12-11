import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { Reducer } from '@state/interfaces'
import { StoreState } from '../../interfaces/store-state'
import { LoginSuccessAction } from './login-success.action';

export const SetCredentialsReducer: Reducer<StoreState, LoginSuccessAction> = {
    action: LoginSuccessAction, noDeepCloneAction: true,
    reducerFn: (state: any, action: LoginSuccessAction): Partial<StoreState>=> {
        let {accessToken, refreshToken, user} = action.response;

        accessToken = {
            ...accessToken, 
            expiresIn: _getUnixTimeSeconds() + accessToken.expiresIn,
            token: accessToken?.token.replace("Bearer ", "")
        };

        return {accessToken, refreshToken, currentUser: user}
    }
}