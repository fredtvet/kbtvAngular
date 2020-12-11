import { StateAction } from '@state/state.action';
import { SyncConfig, SyncResponse, SyncStateConfig } from '../interfaces';

export class SyncStateAction extends StateAction { propagate: boolean = true; }

export class SyncStateSuccessAction extends StateAction {
    constructor(
        public response: SyncResponse<any>,
        public syncStateConfig: SyncStateConfig<any>,
    ){ super() }
}   

export class UpdateSyncConfigAction extends StateAction { 
    constructor(public syncConfig: SyncConfig){ super() }
    propagate: boolean = true;
}   

export class WipeSyncStateAction extends StateAction {
    constructor(public syncStateConfig: SyncStateConfig<any>){ super() }
}

export class ReloadSyncStateAction extends StateAction { propagate: boolean = true; }