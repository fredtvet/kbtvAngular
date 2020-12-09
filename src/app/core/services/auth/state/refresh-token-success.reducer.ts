import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { Reducer, StateAction } from '@state/interfaces'
import { RefreshTokenResponse } from '../interfaces'
import { StoreState } from '../interfaces/store-state'

export const RefreshTokenSuccessActionId = "REFRESH_TOKEN_SUCCESS"

export interface RefreshTokenSuccessCommand extends StateAction, RefreshTokenResponse { }

export const RefreshTokenSuccessReducer: Reducer<StoreState> = {
    actionId: RefreshTokenSuccessActionId,
    reducerFn: (state: any, action: RefreshTokenSuccessCommand): Partial<StoreState>=> {
        action.accessToken.expiresIn = 
            _getUnixTimeSeconds() + action.accessToken.expiresIn;
        return {accessToken: action.accessToken, refreshToken: action.refreshToken}
    }
}