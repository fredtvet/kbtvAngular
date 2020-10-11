import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';
import { TimesheetStatus } from 'src/app/shared/enums';

export const UpdateStatusesAction = "UPDATE_STATUSES"

export interface UpdateStatusesStateCommand extends StateCommand{
    ids: string[];
    status: TimesheetStatus;
}