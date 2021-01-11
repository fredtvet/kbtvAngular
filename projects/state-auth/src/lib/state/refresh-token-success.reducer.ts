import { _getUnixTimeSeconds } from 'date-time-helpers'
import { Immutable } from 'global-types'
import { Reducer, _createReducer } from 'state-management'
import { StoreState } from '../interfaces'
import { RefreshTokenSuccessAction } from './actions.const'

export const RefreshTokenSuccessReducer: Reducer<unknown, RefreshTokenSuccessAction> = _createReducer(
        RefreshTokenSuccessAction,
        (state: unknown, action: Immutable<RefreshTokenSuccessAction>): Partial<StoreState>=> {
            const {accessToken, refreshToken} = action.response;  
            return {
                accessToken: accessToken.token,
                accessTokenExpiration: _getUnixTimeSeconds() + accessToken.expiresIn,
                refreshToken
            }
        }
    )