import { Reducer, StateAction } from 'src/app/state/interfaces';
import { State } from '../interfaces';

export const HttpQueueShiftActionId = "HTTP_QUEUE_SHIFT";

export const HttpQueueShiftReducer: Reducer<State> = {
    actionId: HttpQueueShiftActionId,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true,
    reducerFn: (state: State, action: StateAction) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
}