import { Timesheet } from "@core/models";
import { TimesheetSummary } from "../interfaces";
import { TimesheetStatus } from "@shared/enums";
import { Immutable } from "global-types";

export function _addHoursToSummary(summary: TimesheetSummary, timesheet: Immutable<Timesheet>): void{
    if(!timesheet) return;
    if (timesheet.status === TimesheetStatus.Confirmed)
      summary.confirmedHours = Math.round((summary.confirmedHours + <number> timesheet.totalHours) * 10) / 10;
    else   
      summary.openHours = Math.round((summary.openHours + <number> timesheet.totalHours) * 10) / 10;
}