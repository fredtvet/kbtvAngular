import { UnknownState } from '@global/interfaces';
import { StateAction } from '@state/state.action';
import { SyncConfig, SyncResponse, SyncStateConfig } from '../interfaces';

export const SyncStateAction = "SYNC_STATE_ACTION";
export interface SyncStateAction extends StateAction { }

export const SyncStateSuccessAction = "SYNC_STATE_SUCCESS_ACTION";
export interface SyncStateSuccessAction extends StateAction {
    response: SyncResponse<UnknownState>,
    syncStateConfig: SyncStateConfig<UnknownState>
}   

export const UpdateSyncConfigAction = "UPDATE_SYNC_CONFIG_ACTION";
export interface UpdateSyncConfigAction extends StateAction {
    syncConfig: SyncConfig
}   

export const WipeSyncStateAction = "WIPE_SYNC_STATE_ACTION";
export interface WipeSyncStateAction extends StateAction {
    syncStateConfig: SyncStateConfig<UnknownState>
}

export const ReloadSyncStateAction = "RELOAD_SYNC_STATE_ACTION";
export interface ReloadSyncStateAction extends StateAction { }