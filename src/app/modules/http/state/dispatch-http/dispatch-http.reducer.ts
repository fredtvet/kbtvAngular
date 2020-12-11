import { _deepClone } from '@state/helpers/deep-clone.helper';
import { Reducer } from '@state/interfaces';
import { DispatchHttpAction } from './dispatch-http.action';

export const DispatchHttpReducer: Reducer<any, DispatchHttpAction> = {
    action: DispatchHttpAction, noDeepCloneState: true, 
    stateProperties: ['requestQueue'],
    reducerFn: (state: any, action: DispatchHttpAction) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        const request = requestQueue[0];
        if(request) requestQueue[0] = {...request, dispatched: true};
        return {requestQueue}
    }
}