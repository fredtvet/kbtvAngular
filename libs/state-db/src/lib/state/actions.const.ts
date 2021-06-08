import { StateAction } from 'state-management'
import { StorageType } from '../interfaces';

/** Action responsible for setting state from storage.  */
export const SetPersistedStateAction = "SET_PERSISTED_STATE_ACTION";
export interface SetPersistedStateAction extends StateAction<typeof SetPersistedStateAction> {
    storageType: StorageType,
    state: {}
}