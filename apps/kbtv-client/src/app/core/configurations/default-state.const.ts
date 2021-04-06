import { StateSyncConfig } from 'state-sync';
import { _getDateYearsAgo, _getFirstDayOfMonth } from 'date-time-helpers'

var isMobile = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const DefaultState: StateSyncConfig = {
    syncConfig: 
        isMobile ? {
            refreshTime: 60*15, 
            initialTimestamp:_getFirstDayOfMonth(_getDateYearsAgo(2)).getTime(),
        } : {
            refreshTime: 60*5, 
            initialTimestamp: _getFirstDayOfMonth(_getDateYearsAgo(4)).getTime(),
        }
}