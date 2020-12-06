import { TimesheetStatus } from 'src/app/shared/enums';
import { StateAction } from 'src/app/state/interfaces';

export const UpdateStatusesActionId = "UPDATE_STATUSES"

export interface UpdateStatusesStateCommand extends StateAction{
    ids: string[];
    status: TimesheetStatus;
}