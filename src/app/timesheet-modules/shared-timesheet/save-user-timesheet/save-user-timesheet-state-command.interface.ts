import { Timesheet } from 'src/app/core/models';
import { SaveModelStateCommand } from 'src/app/core/services/model/state/save-model/save-model-state-command.interface';

export const SaveUserTimesheetAction = "SAVE_USER_TIMESHEET"

export interface SaveUserTimesheetStateCommand extends SaveModelStateCommand<Timesheet>{
    password: string;
}