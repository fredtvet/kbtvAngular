import { _deepClone } from '@state/helpers/deep-clone.helper';
import { Reducer } from '@state/interfaces';
import { HttpErrorAction } from './http-error.action';

export const HttpErrorReducer: Reducer<any, HttpErrorAction> = {
    action: HttpErrorAction, noDeepCloneState: true, 
    stateProperties: ['requestQueue'],
    reducerFn: (state: any, action: HttpErrorAction) => {
        if(!state.requestQueue) return null;
        const currentRequest = state.requestQueue[0];
        return { ...currentRequest.stateSnapshot, requestQueue: [] };
    }
}