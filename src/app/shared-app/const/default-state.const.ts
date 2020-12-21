import { StateSyncConfig } from '@sync/interfaces';

export const DefaultState: StateSyncConfig = {
    syncConfig: {
        refreshTime: 60*30, 
        initialNumberOfMonths: '48',
    }
}