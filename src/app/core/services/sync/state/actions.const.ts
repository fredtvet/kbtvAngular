import { StateAction } from 'src/app/state/interfaces';
import { SyncConfig, SyncResponse, SyncStateConfig } from '../interfaces';

export const SyncStateActionId = "SYNC_STATE";

export const SyncStateSuccessActionId = "SYNC_STATE_SUCCESS";
export interface SyncStateSuccessAction extends StateAction {
    response: SyncResponse
}   

export const UpdateSyncConfigActionId = "UPDATE_SYNC_CONFIG"
export interface UpdateSyncConfigCommand extends StateAction {
    syncConfig: SyncConfig
}   

export const WipeSyncStateActionId = "WIPE_SYNC_STATE"
export interface WipeSyncStateCommand extends StateAction {
    syncStateConfig: SyncStateConfig<any>;
}

export const ReloadSyncStateActionId = "RELOAD_SYNC_STATE";
