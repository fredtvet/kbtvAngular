import { WipeStateAction } from '@core/global-actions';
import { Immutable, UnknownState } from 'global-types';
import { _createReducer } from 'state-management';

export const WipeStateReducer = _createReducer(
    WipeStateAction, 
    (state: Immutable<{}>, action: Immutable<WipeStateAction>): {} => {
        const ignoredState: UnknownState = 
          {refreshToken: true, accessToken: true, accessTokenExpiration: true, currentUser: true};
        
        const deleteState: UnknownState = {};

        for(const key in state)
          if(!ignoredState[key]) deleteState[key] = undefined;

        return {...deleteState, ...(action.defaultState || {})}
    }
)


