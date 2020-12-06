import { Reducer, StateAction } from 'src/app/state/interfaces';
import { StoreState } from '../../interfaces/store-state';

export const WipeTokensActionId = "WIPE_TOKENS"; 

export const WipeTokensReducer: Reducer<StoreState> = {
    actionId: WipeTokensActionId, noDeepCloneAction: true,
    reducerFn: (state: any, action: StateAction): Partial<StoreState>=> {
        return {accessToken: null, refreshToken: null}
    }
}