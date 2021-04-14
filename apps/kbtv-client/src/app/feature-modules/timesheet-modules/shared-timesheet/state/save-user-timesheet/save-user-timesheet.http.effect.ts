import { SaveUserTimesheetAction } from '@actions/timesheet-actions';
import { Inject, Injectable } from '@angular/core';
import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { Effect } from 'state-management';
import { ModelCommandApiMap, MODEL_COMMAND_API_MAP, SaveModelHttpEffect } from 'state-model';

@Injectable()
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect<Timesheet, StateUserTimesheets> 
    implements Effect<SaveUserTimesheetAction> {

    protected type: string = SaveUserTimesheetAction

    constructor(@Inject(MODEL_COMMAND_API_MAP) apiMap: ModelCommandApiMap){ super(apiMap); }

}