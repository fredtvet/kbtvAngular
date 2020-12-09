import { NgModule } from '@angular/core';
import { STORE_REDUCERS } from '../state/injection-tokens';
import { ModelStateConfig } from './model-state.config';
import { ModelFetcherService } from './state/fetch-model/model-fetcher.service';
import { SetFetchedStateReducer } from './state/fetch-model/set-fetched-state.reducer';

@NgModule({
    providers: [   
        {provide: STORE_REDUCERS, useValue: SetFetchedStateReducer, multi: true},
    ]
})
export class ModelModule { 
    constructor(
        modelFetcherService: ModelFetcherService,
        rootConfigSetter: ModelStateConfig,
    ){}
}
  