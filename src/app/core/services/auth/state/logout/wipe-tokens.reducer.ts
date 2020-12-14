import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
import { StoreState } from '../../interfaces/store-state';

export class WipeTokensAction extends StateAction {};

export const WipeTokensReducer = _createReducer(
    WipeTokensAction, (): Partial<StoreState> => {
        return {accessToken: null, refreshToken: null}
    }, true
)