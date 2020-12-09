import { Timesheet } from '@core/models';
import { StateTimesheets } from '@core/state/global-state.interfaces';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';

export const SaveUserTimesheetActionId = "SAVE_USER_TIMESHEET"

export interface SaveUserTimesheetCommand extends SaveModelStateCommand<Timesheet, StateTimesheets>{
    password: string;
}