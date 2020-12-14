import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { StateRequestQueue } from '../interfaces';

export const HttpQueueShiftAction = "HTTP_QUEUE_SHIFT_ACTION";
export interface HttpQueueShiftAction extends StateAction {}

export const HttpQueueShiftReducer = _createReducer(
    HttpQueueShiftAction,
    (state: Immutable<StateRequestQueue>) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
)