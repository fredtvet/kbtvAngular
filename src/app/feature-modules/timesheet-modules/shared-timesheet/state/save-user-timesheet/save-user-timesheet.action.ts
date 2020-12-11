import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { SaveAction } from '@model/interfaces';
import { SaveModelAction } from '@model/state/save-model/save-model.action';

export class SaveUserTimesheetAction extends SaveModelAction<Timesheet, StateUserTimesheets>{
    constructor(
        entity: Timesheet,
        saveAction: SaveAction,    
    ){ super("userTimesheets", entity, saveAction) };
}