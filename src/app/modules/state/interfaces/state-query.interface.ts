import { StateAction } from './state-action.interface';

export const StateQueryActionId = "STATE_QUERY"

export interface StateQueryAction extends StateAction {
    actionId: typeof StateQueryActionId;
    props: string[];
}