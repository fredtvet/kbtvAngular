import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { Immutable } from '@immutable/interfaces'
import { _createReducer } from '@state/helpers/create-reducer.helper'
import { StateAction } from '@state/state.action'
import { RefreshTokenResponse } from '../interfaces'
import { StoreState } from '../interfaces/store-state'

export const RefreshTokenSuccessAction = "REFRESH_TOKEN_SUCCESS_ACTION";
export interface RefreshTokenSuccessAction extends StateAction {
    response: RefreshTokenResponse
}

export const RefreshTokenSuccessReducer = _createReducer(
    RefreshTokenSuccessAction,
    (state: any, action: Immutable<RefreshTokenSuccessAction>): Partial<StoreState>=> {
        const {accessToken, refreshToken} = action.response;  
        return {
            accessToken: {...accessToken, expiresIn: _getUnixTimeSeconds() + accessToken.expiresIn},
            refreshToken
        }
    }
)