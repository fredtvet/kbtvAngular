import { Reducer, _createReducer } from 'state-management';
import { StoreState } from '../../interfaces';
import { WipeTokensAction } from '../actions.const';

export const WipeTokensReducer: Reducer<unknown, WipeTokensAction> = _createReducer(
    WipeTokensAction, (): Partial<StoreState> => {
        return {accessToken: undefined, refreshToken: undefined}
    }
)