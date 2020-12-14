import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';

export class WipeStateAction extends StateAction { 
  constructor(public defaultState: any){ super() } 
}

export const WipeStateReducer = _createReducer(
    WipeStateAction, 
    (state: Immutable<Object>, action: Immutable<WipeStateAction>): any => {
        const ignoredState = {refreshToken: true, accessToken: true, currentUser: true};
        
        const deleteState = {};

        for(const key in state)
          if(!ignoredState[key]) deleteState[key] = undefined;

        return {...deleteState, ...(action.defaultState || {})}
    }, false
)


