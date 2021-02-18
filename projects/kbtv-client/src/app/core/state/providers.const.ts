import { Provider } from '@angular/core';
import { STORE_ACTION_INTERCEPTORS, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { SaveModelHttpEffect, SaveModelReducer } from 'state-model';
import { ModelFileValidatorInterceptor } from './model-file.validator';
import { SaveModelFileHttpEffect } from './save-model-file/save-model-file.http.effect';
import { SaveModelFileReducer } from './save-model-file/save-model-file.reducer';

export const SaveModelFileProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelFileHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
    {provide: STORE_ACTION_INTERCEPTORS, useClass: ModelFileValidatorInterceptor, multi: true},
]

export const AppSaveModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
]
