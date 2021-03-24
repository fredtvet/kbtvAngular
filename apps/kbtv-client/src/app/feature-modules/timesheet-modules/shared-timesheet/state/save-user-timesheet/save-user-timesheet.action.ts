import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { SaveModelAction } from 'state-model';

export const SaveUserTimesheetAction = SaveModelAction+"IMESHEET";
export interface SaveUserTimesheetAction extends SaveModelAction<Timesheet, StateUserTimesheets>{}