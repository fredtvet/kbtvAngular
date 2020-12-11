import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { Reducer } from '@state/interfaces'
import { StateAction } from '@state/state.action'
import { RefreshTokenResponse } from '../interfaces'
import { StoreState } from '../interfaces/store-state'

export class RefreshTokenSuccessAction extends StateAction {
    constructor(public response: RefreshTokenResponse){ super() } 
}

export const RefreshTokenSuccessReducer: Reducer<StoreState, RefreshTokenSuccessAction> = {
    action: RefreshTokenSuccessAction,
    reducerFn: (state: any, action: RefreshTokenSuccessAction): Partial<StoreState>=> {
        let {accessToken, refreshToken} = action.response;
        accessToken.expiresIn =  _getUnixTimeSeconds() + accessToken.expiresIn;
        return {accessToken, refreshToken}
    }
}