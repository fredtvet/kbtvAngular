import { StateRequestQueue } from '@http/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { DispatchHttpAction } from './dispatch-http.action';

export const DispatchHttpReducer = _createReducer(
    DispatchHttpAction,
    (state: Immutable<StateRequestQueue>) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        const request = requestQueue[0];
        if(request) requestQueue[0] = {...request, dispatched: true};
        return {requestQueue}
    }
)