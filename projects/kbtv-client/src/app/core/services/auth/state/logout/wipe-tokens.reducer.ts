import { StateAction, _createReducer } from 'state-management';
import { StoreState } from '../../interfaces/store-state';

export const WipeTokensAction = "WIPE_TOKENS_ACTION"
export interface WipeTokensAction extends StateAction {};

export const WipeTokensReducer = _createReducer(
    WipeTokensAction, (): Partial<StoreState> => {
        return {accessToken: undefined, refreshToken: undefined}
    }
)