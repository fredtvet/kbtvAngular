import { Mission, User } from '@core/models';
import { CriteriaChipOptions } from '@core/services/ui/chips-factory.service';
import { _getModelDisplayValue } from 'model/core';
import { TimesheetStatus } from '@shared/enums';
import { translations } from '@shared-app/translations';
import { DateRange, _formatDateRange, _formatShortDate } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { TimesheetCriteria } from './timesheet-criteria.interface';
import { ModelState } from '@core/state/model-state.interface';

export const TimesheetCriteriaChipOptions: {[key in keyof TimesheetCriteria]: CriteriaChipOptions} = {
    user: {valueFormatter: (val: Immutable<User>) => val.lastName + ', ' + val.lastName}, 
    mission: {valueFormatter: (val: Immutable<Mission>) => <string> _getModelDisplayValue<ModelState, Mission>("missions", val)},
    dateRange: {valueFormatter: (val: Immutable<DateRange>) => _formatDateRange(val, _formatShortDate)}, 
    dateRangePreset: {ignored: true},
    status: {valueFormatter: (val: Immutable<TimesheetStatus>) => translations[TimesheetStatus[val]?.toLowerCase()]}, 
}