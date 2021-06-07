import { StateAction } from 'state-management'
import { StorageType } from '../interfaces';

/** Action responsible for loading all persisted state. */
export const LoadPersistedStateAction = "LOAD_PERSISTED_STATE_ACTION";
export interface LoadPersistedStateAction extends StateAction<typeof LoadPersistedStateAction> {}

/** Action responsible for setting state from storage.  */
export const SetPersistedStateAction = "SET_PERSISTED_STATE_ACTION";
export interface SetPersistedStateAction extends StateAction<typeof SetPersistedStateAction> {
    storageType: StorageType,
    state: {}
}