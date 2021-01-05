import { Inject, Injectable } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Effect } from 'state-management';
import { KeyVal } from 'global-types';
import { ModelCommandApiMap, MODEL_COMMAND_API_MAP, ModelCommand, MODEL_PROP_TRANSLATIONS, SaveModelHttpEffect } from 'state-model';
import { SaveUserAction } from './save-user.action';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect<User, ModelState> implements Effect<SaveUserAction> {
    
    protected type: string = SaveUserAction

    constructor(
        @Inject(MODEL_COMMAND_API_MAP) apiMap: ModelCommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) translations: Readonly<KeyVal<string>>
    ){ super(apiMap, translations) }

    protected createHttpBody(action: SaveUserAction): User & {password?: string} {
        if(action.saveAction === ModelCommand.Update) return action.entity;
        return {...action.entity, password: action.password};
    }
}