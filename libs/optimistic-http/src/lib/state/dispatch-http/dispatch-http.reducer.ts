import { Reducer, _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { DispatchNextHttpAction } from './dispatch-http.action';
import { StateRequestQueue } from '../../interfaces';

export const DispatchHttpReducer: Reducer<Immutable<StateRequestQueue>, DispatchNextHttpAction> = _createReducer(
    DispatchNextHttpAction,
    (state: Immutable<StateRequestQueue>, action: Immutable<DispatchNextHttpAction>) => {
        if(!state.requestQueue) return;
        const requestQueue = [...state.requestQueue];
        const request = requestQueue[0];
        if(request) requestQueue[0] = {...request, dispatched: true};
        return {requestQueue}
    }
)