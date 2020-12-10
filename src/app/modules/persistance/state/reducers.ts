import { Reducer } from '@state/interfaces';
import { SetPersistedCriticalStateActionId, SetPersistedStateActionId, SetStateCommand } from './actions.const';

export const SetPersistedCriticalStateReducer: Reducer<any, SetStateCommand> = {
    actionId: SetPersistedCriticalStateActionId,
    reducerFn: (state: any, action: SetStateCommand) => action.state,
    noDeepCloneAction: true,
}

export const SetPersistedStateReducer: Reducer<any, SetStateCommand> = {
    ...SetPersistedCriticalStateReducer,
    actionId: SetPersistedStateActionId,
}
