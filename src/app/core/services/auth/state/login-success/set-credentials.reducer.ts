import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { Reducer } from '@state/interfaces'
import { StoreState } from '../../interfaces/store-state'
import { LoginSuccessActionId, LoginSuccessCommand } from './login-success-command.interface'

export const SetCredentialsReducer: Reducer<StoreState, LoginSuccessCommand> = {
    actionId: LoginSuccessActionId,
    reducerFn: (state: any, action: LoginSuccessCommand): Partial<StoreState>=> {
        var {accessToken, refreshToken, user} = action;

        accessToken = {
            ...action.accessToken, 
            expiresIn: _getUnixTimeSeconds() + accessToken.expiresIn,
            token: action.accessToken?.token.replace("Bearer ", "")
        };

        return {accessToken, refreshToken, currentUser: user}
    }
}