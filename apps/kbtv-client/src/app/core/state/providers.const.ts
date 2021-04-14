import { Provider } from '@angular/core';
import { STORE_ACTION_INTERCEPTORS, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { SaveModelHttpEffect, SaveModelReducer } from 'model/state';
import { SaveModelFileHttpEffect } from './save-model-file/save-model-file.http.effect';
import { SaveModelFileReducer } from './save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from './save-model-file/save-model-file.validator';

export const SaveModelFileProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelFileHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
    {provide: STORE_ACTION_INTERCEPTORS, useClass: SaveModelFileValidatorInterceptor, multi: true},
]

export const AppSaveModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
]
