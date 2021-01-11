export const StateAction = "STATE_ACTION";
export interface StateAction {
    /** A string value uniquely identifying the action */
    type: string;
    /** If true the action will be dispatched to all stores higher up in the dependency tree.  */
    propagate?: boolean;
}