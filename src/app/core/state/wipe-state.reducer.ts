import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';

export const WipeStateAction = "WIPE_STATE_ACTION";
export interface WipeStateAction extends StateAction { defaultState: Object }

export const WipeStateReducer = _createReducer(
    WipeStateAction, 
    (state: Immutable<Object>, action: Immutable<WipeStateAction>): Object => {
        const ignoredState = {refreshToken: true, accessToken: true, currentUser: true};
        
        const deleteState = {};

        for(const key in state)
          if(!ignoredState[key]) deleteState[key] = undefined;

        return {...deleteState, ...(action.defaultState || {})}
    }
)


