import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export class WipeStateAction extends StateAction { 
  constructor(public defaultState: any){ super() } 
}

export const WipeStateReducer: Reducer<any, WipeStateAction> = {
    action: WipeStateAction, noDeepCloneState: true, stateProperties: "all",
    reducerFn: (state: any, action: WipeStateAction): any => {
        const ignoredState = {refreshToken: true, accessToken: true, currentUser: true};

        const deleteState = {};

        for(const key in state)
          if(!ignoredState[key]) deleteState[key] = undefined;

        return {...deleteState, ...(action.defaultState || {})}
    }
}


