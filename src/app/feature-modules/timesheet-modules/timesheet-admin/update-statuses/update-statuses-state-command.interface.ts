import { TimesheetStatus } from '@shared/enums';
import { StateAction } from '@state/interfaces';

export const UpdateStatusesActionId = "UPDATE_STATUSES"

export interface UpdateStatusesStateCommand extends StateAction{
    ids: string[];
    status: TimesheetStatus;
}