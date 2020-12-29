import { Inject, Injectable } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Effect } from 'state-management';
import { CommandApiMap, COMMAND_API_MAP, KeyVal, ModelCommand, MODEL_PROP_TRANSLATIONS, SaveModelHttpEffect } from 'state-model';
import { SaveUserAction } from './save-user.action';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect<User, ModelState> implements Effect<SaveUserAction> {
    
    protected type: string = SaveUserAction

    constructor(
        @Inject(COMMAND_API_MAP) apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(action: SaveUserAction): User & {password?: string} {
        if(action.saveAction === ModelCommand.Update) return action.entity;
        return {...action.entity, password: action.password};
    }
}