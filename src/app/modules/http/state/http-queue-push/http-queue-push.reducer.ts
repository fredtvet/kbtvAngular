import { Reducer } from '@state/interfaces';
import { StateRequestQueue } from '../../interfaces';
import { HttpQueuePushAction } from './http-queue-push.action';

export const HttpQueuePushReducer: Reducer<StateRequestQueue, HttpQueuePushAction> = {
    action: HttpQueuePushAction,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true, noDeepCloneAction: true,
    reducerFn: (state: StateRequestQueue, action: HttpQueuePushAction) => {
        return {requestQueue: [...(state.requestQueue || []), action.command]}
    }
}

