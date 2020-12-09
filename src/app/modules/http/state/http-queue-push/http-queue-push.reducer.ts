import { Reducer } from '@state/interfaces';
import { StateRequestQueue } from '../../interfaces';
import { HttpQueuePushActionId, HttpQueuePushCommand } from './http-queue-push-command.interface';

export const HttpQueuePushReducer: Reducer<StateRequestQueue> = {
    actionId: HttpQueuePushActionId,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true, noDeepCloneAction: true,
    reducerFn: (state: StateRequestQueue, action: HttpQueuePushCommand) => {
        return {requestQueue: [...(state.requestQueue || []), action.command]}
    }
}

