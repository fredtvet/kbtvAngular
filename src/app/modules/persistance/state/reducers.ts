import { Reducer } from '@state/interfaces';
import { SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer: Reducer<any, SetPersistedCriticalStateAction> = {
    action: SetPersistedCriticalStateAction,
    reducerFn: (state: any, action: SetPersistedCriticalStateAction) => action.state,
    noDeepCloneAction: true,
}

export const SetPersistedStateReducer: Reducer<any, SetPersistedStateAction> = {
    ...SetPersistedCriticalStateReducer,
    action: SetPersistedStateAction,
}
