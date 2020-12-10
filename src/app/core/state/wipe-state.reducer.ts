import { Reducer, StateAction } from '@state/interfaces';

export interface WipeStateCommand extends StateAction { defaultState: any }

export const WipeStateActionId = "WIPE_STATE";

export const WipeStateReducer: Reducer<any, WipeStateCommand> = {
    actionId: WipeStateActionId, noDeepCloneState: true, stateProperties: "all",
    reducerFn: (state: any, action: WipeStateCommand): any => {
        const ignoredState = {refreshToken: true, accessToken: true, currentUser: true};

        const deleteState = {};

        for(const key in state)
          if(!ignoredState[key]) deleteState[key] = undefined;

        return {...deleteState, ...(action.defaultState || {})}
    }
}


