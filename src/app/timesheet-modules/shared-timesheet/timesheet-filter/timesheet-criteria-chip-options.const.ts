import { User, Mission } from 'src/app/core/models';
import { CriteriaChipOptions } from 'src/app/core/services/ui/chips-factory.service';
import { _getModelDisplayValue } from 'src/app/model/helpers/get-model-property.helper';
import { _formatDateRange } from 'src/app/shared-app/helpers/datetime/format-date-range.helper';
import { _formatShortDate } from 'src/app/shared-app/helpers/datetime/format-short-date.helper';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateRange } from 'src/app/shared/interfaces/date-range.interface';
import { translations } from 'src/app/shared/translations';
import { TimesheetCriteria } from './timesheet-criteria.interface';

export const TimesheetCriteriaChipOptions: {[key in keyof TimesheetCriteria]: CriteriaChipOptions} = {
    user: {valueFormatter: (val: User) => val.lastName + ', ' + val.lastName}, 
    mission: {valueFormatter: (val: Mission) => _getModelDisplayValue("missions", val)},
    dateRange: {valueFormatter: (val: DateRange) => _formatDateRange(val, _formatShortDate)}, 
    dateRangePreset: {ignored: true},
    status: {valueFormatter: (val: TimesheetStatus) => translations[TimesheetStatus[val]?.toLowerCase()]}, 
}