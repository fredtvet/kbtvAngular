import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { SaveModelAction } from '@model/state/save-model/save-model.action';

export const SaveUserTimesheetAction = SaveModelAction+"IMESHEET";
export interface SaveUserTimesheetAction extends SaveModelAction<Timesheet, StateUserTimesheets>{}