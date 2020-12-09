import { Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from '@state/injection-tokens';
import { SaveModelFileHttpEffect } from './save-model-file.http.effect';
import { SaveModelFileReducer } from './save-model-file.reducer';

export const SaveModelFileProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelFileHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
]
