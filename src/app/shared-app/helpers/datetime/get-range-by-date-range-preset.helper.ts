import { DateRangePresets } from "src/app/shared-app/enums/date-range-presets.enum";
import { _getMonthRange } from './get-month-range.helper';
import { _getWeekRange } from './get-week-range.helper';
import { _getYearRange } from './get-year-range.helper';

export function _getRangeByDateRangePreset(preset: DateRangePresets): Date[] {
    switch (preset) {
      case DateRangePresets.CurrentWeek:
        return _getWeekRange();
      case DateRangePresets.CurrentMonth:
        return _getMonthRange();
      case DateRangePresets.CurrentYear:
        return _getYearRange();
      default: return undefined;
    }
  }