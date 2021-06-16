import { Immutable, DateInput, Maybe } from "global-types";
import { _getStartOfDayTime } from "./get-start-of-day.helper";
import { DateRange } from "./interfaces";

export function _isDateInDateRange(date: Immutable<Maybe<DateInput>>, dateRange: Immutable<Partial<DateRange>>): boolean {
    if(!date) return false;

    let startOfDay = _getStartOfDayTime(date);
    let exp = true;

    if(dateRange.start) {                
        exp = exp && startOfDay >= _getStartOfDayTime(dateRange.start);
        if(exp === false) return exp;
    }
   

    if(dateRange.end)
        exp = exp && startOfDay <= _getStartOfDayTime(dateRange.end); 

    return exp;
}