import { Inject, Injectable, Type } from '@angular/core';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { Effect } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { SaveUserTimesheetAction } from './save-user-timesheet.action'

@Injectable()
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserTimesheetAction> {

    protected action: Type<StateAction> = SaveUserTimesheetAction

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations); }

}