import { ModelState } from 'src/app/core/model/model.state';
import { StateCurrentUser, StateSyncConfig } from 'src/app/core/state/interfaces/global.state';
import { SyncStoreConfig } from './sync-store-config.interface';
import { SyncStoreTimestamps } from './sync-store-timestamps.interface';

export interface StoreState extends Partial<ModelState>,
    StateSyncConfig,
    StateCurrentUser
{
    syncConfig: SyncStoreConfig
    syncTimestamps: SyncStoreTimestamps;
}

