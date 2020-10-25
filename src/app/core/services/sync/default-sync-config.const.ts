import { SyncStoreConfig } from './interfaces/sync-store-config.interface';

export const DefaultSyncConfig: SyncStoreConfig = {
    refreshTime: 60*30, 
    initialNumberOfMonths: '48',
}