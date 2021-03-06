import { ModuleWithProviders, NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management'
import { SYNC_HTTP_FETCHER, SYNC_STATE_CONFIG } from './injection-tokens.const';
import { CustomSyncProviders } from './interfaces';
import { ReloadSyncStateEffect } from './state/reload-sync-state.effect';
import { SetSyncResponseReducer } from './state/set-sync-response.reducer';
import { SyncStateHttpEffect } from './state/sync-state.http.effect';
import { UpdateSyncConfigEffect } from './state/update-sync-config.effect';
import { UpdateSyncConfigReducer } from './state/update-sync-config.reducer';
import { WipeSyncStateReducer } from './state/wipe-sync-state.reducer';

/** Responsible for providing root injectables using the forRoot method. */
@NgModule({})
export class StateSyncModule { 
    static forRoot(providers: CustomSyncProviders): ModuleWithProviders<StateSyncModule> {
        return {
            ngModule: StateSyncModule,
            providers: [
                {provide: STORE_REDUCERS, useValue: SetSyncResponseReducer, multi: true},
                {provide: STORE_REDUCERS, useValue: UpdateSyncConfigReducer, multi: true},
                {provide: STORE_REDUCERS, useValue: WipeSyncStateReducer, multi: true},

                {provide: STORE_EFFECTS, useClass: SyncStateHttpEffect, multi: true},
                {provide: STORE_EFFECTS, useClass: UpdateSyncConfigEffect, multi: true},
                {provide: STORE_EFFECTS, useClass: ReloadSyncStateEffect, multi: true},

                {provide: SYNC_HTTP_FETCHER, useClass: providers.fetcher},
                {provide: SYNC_STATE_CONFIG, useValue: providers.config}
            ]
        }
    }
}
