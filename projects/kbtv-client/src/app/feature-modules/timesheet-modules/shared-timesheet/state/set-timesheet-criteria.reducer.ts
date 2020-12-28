import { DateRange } from '@datetime/interfaces';
import { Immutable } from 'global-types';
import { DateRangePresets } from '@shared-app/enums';
import { _getRangeByDateRangePreset } from '@shared-app/helpers/get-range-by-date-range-preset.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';
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