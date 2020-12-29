import { DateRange } from 'date-time-helpers';
import { DateRangePresets } from '@shared-app/enums';
import { _getRangeByDateRangePreset } from '@shared-app/helpers/get-range-by-date-range-preset.helper';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { TimesheetCriteria } from '../timesheet-filter/timesheet-criteria.interface';

export const SetTimesheetCriteriaAction = "SET_TIMESHEET_CRITERIA_ACTION";
export interface SetTimesheetCriteriaAction extends StateAction {
    timesheetCriteria: Immutable<TimesheetCriteria>
}

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: unknown, action: Immutable<SetTimesheetCriteriaAction>) => {
        let {dateRangePreset, dateRange, ...rest} = {...action.timesheetCriteria}

        if(dateRangePreset && dateRangePreset !== DateRangePresets.Custom && dateRangePreset !== DateRangePresets.CustomMonth )
            dateRange = <DateRange> _getRangeByDateRangePreset(dateRangePreset);

        return { timesheetCriteria: {dateRangePreset, dateRange, ...rest} }
    }       
) 