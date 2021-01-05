import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { translations } from '@shared/translations';
import { BASE_API_URL, OptimisticHttpModule, OPTIMISTIC_STATE_SELECTOR } from 'optimistic-http';
import { environment } from 'src/environments/environment';
import { HttpAuthTokensInterceptor, StateAuthModule } from 'state-auth';
import { StateDbModule, STATE_DB_CONFIG } from 'state-db';
import { STORE_DEFAULT_STATE, STORE_EFFECTS, STORE_REDUCERS, STORE_SETTINGS } from 'state-management';
import { COMMAND_API_MAP, MODEL_CONFIGS, MODEL_PROP_TRANSLATIONS, StateModelModule } from 'state-model';
import { StateSyncModule } from 'state-sync';
import { AppAuthCommandApiMap } from './configurations/app-auth-command-api-map.const';
import { AppAuthRedirects } from './configurations/app-auth-redirects.const';
import { AppCommandApiMap } from './configurations/app-command-api-map.const';
import { AppStateDbConfig } from './configurations/app-state-db-config.const';
import { AppStoreSettings } from './configurations/app-store-settings.const';
import { DefaultState } from './configurations/default-state.const';
import { ModelConfigs } from './configurations/model-configs.const';
import { AppOptimisticState } from './configurations/optimistic-state-props.const';
import { AppSyncStateConfig } from './configurations/sync-state.config';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { HttpIsOnlineInterceptor } from './interceptors/http.is-online.interceptor';
import { HttpLoadingInterceptor } from './interceptors/http.loading.interceptor';
import { StartupService } from './services/startup.service';
import { SyncHttpFetcherService } from './services/sync-http-fetcher.service';
import { InitalizeHttpQueueEffect, InitalizeSyncEffect } from './state/initalizing.effects';
import { NotifyOnOptimisticErrorEffect } from './state/notify-on-optimistic-error.effect';
import { NotifyOnUnauthorizedEffect } from './state/notify-on-unauthorized.effect';
import { SyncUserOnLoginEffect } from './state/sync-user-on-login.effect';
import { WipeStateReducer } from './state/wipe-state.reducer';

@NgModule({
  declarations: [],
  imports: [
    StateSyncModule.forRoot({
      fetcher: SyncHttpFetcherService,
      config: AppSyncStateConfig
    }),
    StateAuthModule.forRoot(AppAuthCommandApiMap, AppAuthRedirects),
    StateDbModule,  
    OptimisticHttpModule,
    StateModelModule
  ],
  providers: [   
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthTokensInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },

    { provide: STORE_SETTINGS, useValue: AppStoreSettings},

    { provide: BASE_API_URL, useValue: environment.apiUrl},
    { provide: MODEL_CONFIGS, useValue: ModelConfigs },
    { provide: COMMAND_API_MAP, useValue: AppCommandApiMap },
    { provide: MODEL_PROP_TRANSLATIONS, useValue: translations },

    { provide: OPTIMISTIC_STATE_SELECTOR, useValue: AppOptimisticState},

    { provide: STATE_DB_CONFIG, useValue: AppStateDbConfig},   

    { provide: STORE_DEFAULT_STATE, useValue: DefaultState },

    { provide: STORE_EFFECTS, useClass: InitalizeSyncEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: InitalizeHttpQueueEffect, multi: true },

    { provide: STORE_EFFECTS, useClass: SyncUserOnLoginEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: NotifyOnOptimisticErrorEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: NotifyOnUnauthorizedEffect, multi: true},
    { provide: STORE_REDUCERS, useValue: WipeStateReducer, multi: true},   
  ]
})
export class CoreModule { 
  constructor(startupService: StartupService){}
}
