import { Reducer, _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { DispatchHttpAction } from './dispatch-http.action';
import { StateRequestQueue } from '../../interfaces';

export const DispatchHttpReducer: Reducer<Immutable<StateRequestQueue>, DispatchHttpAction> = _createReducer(
    DispatchHttpAction,
    (state: Immutable<StateRequestQueue>, action: Immutable<DispatchHttpAction>) => {
        if(!state.requestQueue) return;
        const requestQueue = [...state.requestQueue];
        const request = requestQueue[0];
        if(request) requestQueue[0] = {...request, dispatched: true, commandId: action.commandId};
        return {requestQueue}
    }
)