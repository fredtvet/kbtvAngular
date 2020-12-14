import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper'
import { _createReducer } from '@state/helpers/create-reducer.helper'
import { StateAction } from '@state/state.action'
import { RefreshTokenResponse } from '../interfaces'
import { StoreState } from '../interfaces/store-state'

export class RefreshTokenSuccessAction extends StateAction {
    constructor(public response: RefreshTokenResponse){ super() } 
}

export const RefreshTokenSuccessReducer = _createReducer(
    RefreshTokenSuccessAction,
    (state: any, action: RefreshTokenSuccessAction): Partial<StoreState>=> {
        let {accessToken, refreshToken} = action.response;
        accessToken.expiresIn = _getUnixTimeSeconds() + accessToken.expiresIn;   
        return {accessToken, refreshToken}
    }
)