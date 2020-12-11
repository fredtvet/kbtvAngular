import { TimesheetStatus } from '@shared/enums';
import { StateAction } from '@state/state.action';

export class UpdateTimesheetStatusesAction extends StateAction{
    constructor(
        public ids: string[],
        public status: TimesheetStatus
    ){ super() }
}