import { Inject, Injectable } from '@angular/core';
import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { Effect } from 'state-management';
import { KeyVal } from 'global-types';
import { CommandApiMap, COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS, SaveModelHttpEffect } from 'state-model';
import { SaveUserTimesheetAction } from './save-user-timesheet.action';

@Injectable()
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect<Timesheet, StateUserTimesheets> 
    implements Effect<SaveUserTimesheetAction> {

    protected type: string = SaveUserTimesheetAction

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations); }

}