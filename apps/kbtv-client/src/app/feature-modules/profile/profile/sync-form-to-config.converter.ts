import { SyncConfigForm } from "@shared/constants/forms/sync-config.form.const";
import { _getFirstDayOfMonth } from "date-time-helpers";
import { Converter } from "model/form";
import { SyncConfig } from "state-sync";

export const _syncFormToConfigConverter: Converter<SyncConfigForm, SyncConfig> = 
    ({initialMonthISO, refreshTime}) => { return {
        refreshTime: refreshTime * 60, 
        initialTimestamp: _getFirstDayOfMonth(initialMonthISO).getTime()
    }}