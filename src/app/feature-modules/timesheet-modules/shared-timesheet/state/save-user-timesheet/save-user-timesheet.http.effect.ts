import { Inject, Injectable } from '@angular/core';
import { Timesheet } from '@core/models';
import { StateUserTimesheets } from '@core/state/global-state.interfaces';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { Effect } from '@state/interfaces';
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