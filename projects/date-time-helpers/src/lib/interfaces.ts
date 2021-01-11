/** Represents the range between two specified dates */
export interface DateRange {
    start: Date | string | number;
    end: Date | string | number;
}

/** Represents a week and year */
export interface WeekYear {
    weekNr: number;
    year: number;
}