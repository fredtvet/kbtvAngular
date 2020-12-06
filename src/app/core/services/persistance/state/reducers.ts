import { Reducer } from 'src/app/state/interfaces';
import { SetPersistedCriticalStateActionId, SetPersistedStateActionId, SetStateCommand } from './actions.const';

export const SetPersistedCriticalStateReducer: Reducer<any> = {
    actionId: SetPersistedCriticalStateActionId,
    reducerFn: (state: any, action: SetStateCommand) => action.state,
    noDeepCloneAction: true,
}

export const SetPersistedStateReducer: Reducer<any> = {
    ...SetPersistedCriticalStateReducer,
    actionId: SetPersistedStateActionId,
}
