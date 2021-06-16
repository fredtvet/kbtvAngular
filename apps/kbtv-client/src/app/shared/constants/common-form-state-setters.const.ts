import { DateRange, _getISO } from "date-time-helpers"
import { _formStateSetter } from "dynamic-forms"
import { StateSyncConfig } from "state-sync"
import { DateRangeControlGroupState } from "./common-controls.const"

export type SyncModelDateRangeFormState = StateSyncConfig & DateRangeControlGroupState
export const SyncModelDateRangeFormStateSetters = [
    _formStateSetter<{dateRange: DateRange}, SyncModelDateRangeFormState>()(["dateRange.start"], ["syncConfig"], (f,s) => { 
        return { endMin: <string> f['dateRange.start'] || (s.syncConfig?.initialTimestamp ? _getISO(s.syncConfig.initialTimestamp) : undefined) } 
    }), 
    _formStateSetter<{dateRange: DateRange}, SyncModelDateRangeFormState>()([], ["syncConfig"], (f,s) => { 
        return { startMin: s.syncConfig?.initialTimestamp ? _getISO(s.syncConfig.initialTimestamp) : undefined } 
    }),
    _formStateSetter<{dateRange: DateRange}, SyncModelDateRangeFormState>()(["dateRange.end"], [], (f) => { 
        return { startMax: <string> f['dateRange.end'] } 
    }),
]