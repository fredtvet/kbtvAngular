import { Reducer, _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { StateRequestQueue } from '../../interfaces';
import { HttpQueuePushAction } from './http-queue-push.action';

export const HttpQueuePushReducer: Reducer<Immutable<StateRequestQueue>, HttpQueuePushAction> = _createReducer(
    HttpQueuePushAction,
    (state: Immutable<StateRequestQueue>, action: Immutable<HttpQueuePushAction>) => {
        return {requestQueue: [...(state.requestQueue || []), action.command]}
    }
)

