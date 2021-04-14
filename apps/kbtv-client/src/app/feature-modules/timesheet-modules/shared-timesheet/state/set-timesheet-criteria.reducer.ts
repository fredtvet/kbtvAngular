import { SetTimesheetCriteriaAction } from '@actions/timesheet-actions';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { _getRangeByDateRangePreset } from '@shared-app/helpers/get-range-by-date-range-preset.helper';
import { DateRange } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { _createReducer } from 'state-management';

export const SetTimesheetCriteriaReducer = _createReducer(
    SetTimesheetCriteriaAction,
    (state: unknown, action: Immutable<SetTimesheetCriteriaAction>) => {
        let {dateRangePreset, dateRange, ...rest} = {...action.timesheetCriteria}

        if(dateRangePreset && dateRangePreset !== DateRangePresets.Custom && dateRangePreset !== DateRangePresets.CustomMonth )
            dateRange = <DateRange> _getRangeByDateRangePreset(dateRangePreset);

        return { [action.criteriaProp]: {dateRangePreset, dateRange, ...rest} }
    }       
) 