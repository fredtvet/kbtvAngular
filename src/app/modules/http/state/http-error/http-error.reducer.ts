import { _deepClone } from '@state/helpers/deep-clone.helper';
import { Reducer } from '@state/interfaces';
import { HttpErrorActionId, HttpErrorCommand } from './http-error-command.interface';

export const HttpErrorReducer: Reducer<any> = {
    actionId: HttpErrorActionId, noDeepCloneState: true, 
    stateProperties: ['requestQueue'],
    reducerFn: (state: any, action: HttpErrorCommand) => {
        if(!state.requestQueue) return null;
        const currentRequest = state.requestQueue[0];
        return { ...currentRequest.stateSnapshot, requestQueue: [] };
    }
}