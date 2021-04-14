import { SaveUserAction } from '@actions/user-actions';
import { Inject, Injectable } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Effect } from 'state-management';
import { ModelCommand, ModelCommandApiMap, MODEL_COMMAND_API_MAP, SaveModelHttpEffect } from 'model-state';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect<User, ModelState> implements Effect<SaveUserAction> {
    
    protected type: string = SaveUserAction

    constructor( @Inject(MODEL_COMMAND_API_MAP) apiMap: ModelCommandApiMap){ super(apiMap) }

    protected createHttpBody(action: SaveUserAction): User & {password?: string} {
        if(action.saveAction === ModelCommand.Update) return action.entity;
        let {employer, ...rest} = action.entity
        return {...rest, password: action.password};
    }
}