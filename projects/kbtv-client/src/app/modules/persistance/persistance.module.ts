import { NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from '@state/constants/injection-tokens.const';
import { InitalizeStatePersisterEffect, LoadCriticalStateEffect, LoadStateEffect } from './state/effects';
import { SetPersistedCriticalStateReducer, SetPersistedStateReducer } from './state/reducers';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
      {provide: STORE_REDUCERS, useValue: SetPersistedCriticalStateReducer, multi: true},
      {provide: STORE_REDUCERS, useValue: SetPersistedStateReducer, multi: true},
      {provide: STORE_EFFECTS, useClass: LoadCriticalStateEffect, multi: true},
      {provide: STORE_EFFECTS, useClass: LoadStateEffect, multi: true},
      {provide: STORE_EFFECTS, useClass: InitalizeStatePersisterEffect, multi: true},
  ]
})
export class PersistanceModule { }
