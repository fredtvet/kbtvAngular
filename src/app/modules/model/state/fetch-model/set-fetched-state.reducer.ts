import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export class SetFetchedStateAction extends StateAction { 
    constructor(public state: Object){ super() } 
}

export const SetFetchedStateReducer: Reducer<any, SetFetchedStateAction> = {
    action: SetFetchedStateAction,
    reducerFn: (state: any, action: SetFetchedStateAction): any => action.state,
}