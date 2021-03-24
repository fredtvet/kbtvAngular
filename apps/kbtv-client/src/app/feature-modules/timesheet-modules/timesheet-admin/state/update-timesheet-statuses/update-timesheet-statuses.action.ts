import { TimesheetStatus } from '@shared/enums';
import { StateAction } from 'state-management'

export const UpdateTimesheetStatusesAction = "UPDATE_TIMESHEET_STATUSES_ACTION";
export interface UpdateTimesheetStatusesAction extends StateAction{
    ids: string[],
    status: TimesheetStatus
}