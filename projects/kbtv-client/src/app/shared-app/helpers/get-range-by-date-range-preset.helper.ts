import { DateRange } from '@datetime/interfaces';
import { Immutable, Maybe } from 'global-types';
import { DateRangePresets } from "@shared-app/enums/date-range-presets.enum";
import { _getLastDayOfYear } from '../../modules/utility/date-time-helpers/get-last-day-of-year.helper';
import { _getMonthRange } from '../../modules/utility/date-time-helpers/get-month-range.helper';
import { _getWeekRange } from '../../modules/utility/date-time-helpers/get-week-range.helper';
import { _getYearRange } from '../../modules/utility/date-time-helpers/get-year-range.helper';

export function _getRangeByDateRangePreset(preset: Maybe<DateRangePresets>, getISO?: boolean): Maybe<Immutable<DateRange>> {
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