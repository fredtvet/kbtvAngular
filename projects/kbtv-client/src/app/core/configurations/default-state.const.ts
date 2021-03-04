import { StateSyncConfig } from 'state-sync';
import { _getDateYearsAgo } from 'date-time-helpers'

export const DefaultState: StateSyncConfig = {
    syncConfig: {
        refreshTime: 60*15, 
        initialTimestamp: _getDateYearsAgo(2).getTime(),
    }
}