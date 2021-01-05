import { StateSyncConfig } from 'state-sync';

export const DefaultState: StateSyncConfig = {
    syncConfig: {
        refreshTime: 60*30, 
        initialNumberOfMonths: '48',
    }
}