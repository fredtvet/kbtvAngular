import { Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'src/app/state/injection-tokens';
import { DeleteModelHttpEffect } from './delete-model/delete-model.http.effect';
import { DeleteModelReducer } from './delete-model/delete-model.reducer';
import { MailModelsHttpEffect } from './mail-models/mail-models.http.effect';
import { SaveModelFileHttpEffect } from './save-model-file/save-model-file.http.effect';
import { SaveModelFileReducer } from './save-model-file/save-model-file.reducer';
import { SaveModelHttpEffect } from './save-model/save-model.http.effect';
import { SaveModelReducer } from './save-model/save-model.reducer';

export const SaveModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
]

export const SaveModelFileProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelFileHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
]

export const DeleteModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
]

export const MailModelsProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
]
