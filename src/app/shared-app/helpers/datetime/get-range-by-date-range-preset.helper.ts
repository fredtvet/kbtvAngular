import { DateRangePresets } from "@shared-app/enums/date-range-presets.enum";
import { DateRange } from '@shared/interfaces/date-range.interface';
import { _getLastDayOfYear } from './get-last-day-of-year.helper';
import { _getMonthRange } from './get-month-range.helper';
import { _getWeekRange } from './get-week-range.helper';
import { _getYearRange } from './get-year-range.helper';

export function _getRangeByDateRangePreset(preset: DateRangePresets, getISO?: boolean): DateRange {
    switch (preset) {
      case DateRangePresets.CurrentWeek:
        return _getWeekRange(new Date(), getISO);
      case DateRangePresets.CurrentMonth:
        return _getMonthRange(new Date(), getISO);
      case DateRangePresets.CurrentYear:
        return _getYearRange(new Date(), getISO);
      case DateRangePresets.ShowAll:{
        const start = new Date(0);   
        const end = _getLastDayOfYear(new Date());
        return {
          start: getISO ? start.toISOString() : start, 
          end: getISO ? end.toISOString() : end
        };
      }
      default: return undefined;
    }
  }