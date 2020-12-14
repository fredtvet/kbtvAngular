import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateRequestQueue } from '../../interfaces';
import { HttpQueuePushAction } from './http-queue-push.action';

export const HttpQueuePushReducer= _createReducer(
    HttpQueuePushAction,
    (state: Immutable<StateRequestQueue>, action: Immutable<HttpQueuePushAction>) => {
        return {requestQueue: [...(state.requestQueue || []), action.command]}
    }, false
)

