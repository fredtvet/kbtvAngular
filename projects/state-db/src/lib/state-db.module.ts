import { NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management'
import { InitalizeStatePersisterEffect, LoadCriticalStateEffect, LoadStateEffect } from './state/effects';
import { SetPersistedCriticalStateReducer, SetPersistedStateReducer } from './state/reducers';

/** Responsible for injecting core providers. Should only be imported in root. */
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
export class StateDbModule { }
