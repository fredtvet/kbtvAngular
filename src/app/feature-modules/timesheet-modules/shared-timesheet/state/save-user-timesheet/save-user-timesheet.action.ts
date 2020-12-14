import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { Immutable } from '@immutable/interfaces';
import { SaveAction } from '@model/interfaces';
import { SaveModelAction } from '@model/state/save-model/save-model.action';

export class SaveUserTimesheetAction extends SaveModelAction<Timesheet, StateUserTimesheets>{
    constructor(
        entity: Immutable<Timesheet>,
        saveAction: SaveAction,    
    ){ super("userTimesheets", entity, saveAction) };
}