import { ModelState } from '../../model/interfaces/model-state.interface';
import { StateCurrentUser, StateSyncConfig } from '../../state/interfaces/global-state.interfaces';
import { SyncStoreConfig } from './sync-store-config.interface';
import { SyncStoreTimestamps } from './sync-store-timestamps.interface';

export interface StoreState extends Partial<ModelState>,
    StateSyncConfig,
    StateCurrentUser
{
    syncConfig: SyncStoreConfig
    syncTimestamps: SyncStoreTimestamps;
}

