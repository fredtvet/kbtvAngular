import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { StoreState } from '../../interfaces/store-state';

export class WipeTokensAction extends StateAction {};

export const WipeTokensReducer: Reducer<StoreState, WipeTokensAction> = {
    action: WipeTokensAction, noDeepCloneAction: true,
    reducerFn: (state: any, action: WipeTokensAction): Partial<StoreState>=> {
        return {accessToken: null, refreshToken: null}
    }
}