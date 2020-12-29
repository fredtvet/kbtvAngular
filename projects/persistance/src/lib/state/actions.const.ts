import { StateAction } from 'state-management'

export const LoadPersistedStateAction = "LOAD_PERSISTED_STATE_ACTION";
export interface LoadPersistedStateAction extends StateAction {}

export const SetPersistedCriticalStateAction = "SET_PERSISTED_CRITICAL_STATE_ACTION";
export interface SetPersistedCriticalStateAction extends StateAction {
    state: {}
}

export const SetPersistedStateAction = "SET_PERSISTED_STATE_ACTION";
export interface SetPersistedStateAction extends StateAction {
    state: {}
}