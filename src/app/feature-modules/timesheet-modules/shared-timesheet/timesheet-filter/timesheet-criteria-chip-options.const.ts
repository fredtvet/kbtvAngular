import { User, Mission } from '@core/models';
import { CriteriaChipOptions } from '@core/services/ui/chips-factory.service';
import { _getModelDisplayValue } from '@model/helpers/get-model-property.helper';
import { _formatDateRange } from '@shared-app/helpers/datetime/format-date-range.helper';
import { _formatShortDate } from '@shared-app/helpers/datetime/format-short-date.helper';
import { TimesheetStatus } from '@shared/enums';
import { DateRange } from '@shared/interfaces/date-range.interface';
import { translations } from '@shared/translations';
import { TimesheetCriteria } from './timesheet-criteria.interface';

export const TimesheetCriteriaChipOptions: {[key in keyof TimesheetCriteria]: CriteriaChipOptions} = {
    user: {valueFormatter: (val: User) => val.lastName + ', ' + val.lastName}, 
    mission: {valueFormatter: (val: Mission) => _getModelDisplayValue("missions", val)},
    dateRange: {valueFormatter: (val: DateRange) => _formatDateRange(val, _formatShortDate)}, 
    dateRangePreset: {ignored: true},
    status: {valueFormatter: (val: TimesheetStatus) => translations[TimesheetStatus[val]?.toLowerCase()]}, 
}