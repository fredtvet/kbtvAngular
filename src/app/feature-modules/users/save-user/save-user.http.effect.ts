import { Inject, Injectable, Type } from '@angular/core';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { CommandApiMap, KeyVal } from '@model/interfaces';
import { ModelCommand } from '@model/model-command.enum';
import { SaveModelHttpEffect } from '@model/state/save-model/save-model.http.effect';
import { Effect } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { SaveUserAction } from './save-user.action';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect implements Effect<SaveUserAction> {
    
    protected action: Type<StateAction> = SaveUserAction

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(action: SaveUserAction): any {
        if(action.saveAction === ModelCommand.Update) return action.entity;
        return {...action.entity, password: action.password};
    }
}