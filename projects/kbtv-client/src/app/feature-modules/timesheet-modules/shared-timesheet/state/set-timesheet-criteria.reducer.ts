import { DateRange } from 'date-time-helpers';
import { _getRangeByDateRangePreset } from '@shared-app/helpers/get-range-by-date-range-preset.helper';
import { Immutable, Prop, UnknownState } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction<TState = UnknownState> extends StateAction {
    timesheetCriteria: Immutable<TimesheetCriteria>,
    criteriaProp: Prop<TState>
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: unknown, action: Immutable<SetTimesheetCriteriaAction>) => {
        let {dateRangePreset, dateRange, ...rest} = {...action.timesheetCriteria}

        if(dateRangePreset && dateRangePreset !== DateRangePresets.Custom && dateRangePreset !== DateRangePresets.CustomMonth )
            dateRange = <DateRange> _getRangeByDateRangePreset(dateRangePreset);

        return { [action.criteriaProp]: {dateRangePreset, dateRange, ...rest} }
    }       
) 