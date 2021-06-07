import { NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management'
import { StatePersisterService } from './state-persister.service';
import { LoadStateEffect } from './state/effects';
import { SetPersistedStateReducer } from './state/reducers';

/** Responsible for injecting core providers. Should only be imported in root. */
@NgModule({
  declarations: [],
  imports: [],
  providers: [
      {provide: STORE_REDUCERS, useValue: SetPersistedStateReducer, multi: true},
      {provide: STORE_EFFECTS, useClass: LoadStateEffect, multi: true},
  ]
})
export class StateDbModule { 
  constructor(statePersisterService: StatePersisterService){}
}
