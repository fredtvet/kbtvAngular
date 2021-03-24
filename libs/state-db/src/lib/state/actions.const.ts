import { StateAction } from 'state-management'

/** Action responsible for loading state. 
    This also initalizes the db and should be called when the app initalizes. */
export const LoadPersistedStateAction = "LOAD_PERSISTED_STATE_ACTION";
export interface LoadPersistedStateAction extends StateAction {}

/** Action responsible for setting critical state. */
export const SetPersistedCriticalStateAction = "SET_PERSISTED_CRITICAL_STATE_ACTION";
export interface SetPersistedCriticalStateAction extends StateAction {
    state: {}
}

/** Action responsible for setting non-critical state.  */
export const SetPersistedStateAction = "SET_PERSISTED_STATE_ACTION";
export interface SetPersistedStateAction extends StateAction {
    state: {}
}