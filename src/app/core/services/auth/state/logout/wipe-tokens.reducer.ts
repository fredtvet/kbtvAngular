import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { StoreState } from '../../interfaces/store-state';

export const WipeTokensAction = "WIPE_TOKENS_ACTION"
export interface WipeTokensAction extends StateAction {};

export const WipeTokensReducer = _createReducer(
    WipeTokensAction, (): Partial<StoreState> => {
        return {accessToken: undefined, refreshToken: undefined}
    }
)