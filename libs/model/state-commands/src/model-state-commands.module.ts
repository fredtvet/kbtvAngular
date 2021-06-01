import { NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelReducer } from './state/delete-model.reducer';
import { SaveModelReducer } from './state/save-model.reducer';
import { SaveModelEffect } from './state/save-model.effect';

/** Responsible for providing reducers and effects for deleting & saving models.  */
@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
        { provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true },
        { provide: STORE_EFFECTS, useClass: SaveModelEffect, multi: true }
    ],
})
export class ModelStateCommandsModule { }
  