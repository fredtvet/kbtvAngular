import { Reducer } from 'src/app/state/interfaces';
import { State } from '../../interfaces';
import { HttpQueuePushActionId, HttpQueuePushCommand } from './http-queue-push-command.interface';

export const HttpQueuePushReducer: Reducer<State> = {
    actionId: HttpQueuePushActionId,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true, noDeepCloneAction: true,
    reducerFn: (state: State, action: HttpQueuePushCommand) => {
        return {requestQueue: [...(state.requestQueue || []), action.command]}
    }
}

