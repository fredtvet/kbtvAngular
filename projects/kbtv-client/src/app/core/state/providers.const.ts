import { Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_META_REDUCERS, STORE_REDUCERS } from 'state-management'
import { SaveModelHttpEffect, SaveModelReducer } from 'state-model';
import { SaveModelFileHttpEffect } from './save-model-file/save-model-file.http.effect';
import { SaveModelFileReducer } from './save-model-file/save-model-file.reducer';
import { saveModelMetaReducer } from './save-model.meta.reducer';

export const SaveModelFileProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelFileHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
    {provide: STORE_META_REDUCERS, useValue: saveModelMetaReducer, multi: true},
]

export const AppSaveModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
    {provide: STORE_META_REDUCERS, useValue: saveModelMetaReducer, multi: true},
]
