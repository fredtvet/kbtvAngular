export const StateAction = "STATE_ACTION";
export interface StateAction {
    type: string;
    propagate?: boolean;
}