import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { translations } from '@shared-app/translations';
import { _registerModelStateConfig } from 'model/core';
import { MODEL_FORM_PROP_TRANSLATIONS } from 'model/form';
import { MODEL_FETCHER_BASE_URL } from 'model/state-fetcher';
import { BASE_API_URL, OptimisticHttpModule, ROOT_OPTIMISTIC_STATE_PROPS } from 'optimistic-http';
import { environment } from 'src/environments/environment';
import { HttpAuthTokensInterceptor, StateAuthModule } from 'state-auth';
import { StateDbModule, STATE_DB_CONFIG } from 'state-db';
import { STORE_DEFAULT_STATE, STORE_EFFECTS, STORE_REDUCERS, STORE_SETTINGS } from 'state-management';
import { StateSyncModule } from 'state-sync';
import { AppAuthCommandApiMap } from './configurations/app-auth-command-api-map.const';
import { AppAuthRedirects } from './configurations/app-auth-redirects.const';
import { AppStateDbConfig } from './configurations/app-state-db-config.const';
import { AppStoreSettings } from './configurations/app-store-settings.const';
import { AppSyncStateConfig } from './configurations/app-sync-state.config';
import { DefaultState } from './configurations/default-state.const';
import { AppModelConfigs } from './configurations/model/app-model-configs.const';
import { AppOptimisticStateProps } from './configurations/optimistic/app-optimistic-state.const';
import { GenericActionRequestMap } from './configurations/optimistic/generic-action-request-map.const';
import { HttpRetryInterceptor } from './interceptors/http-retry.interceptor';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { HttpIsOnlineInterceptor } from './interceptors/http.is-online.interceptor';
import { HttpLoadingInterceptor } from './interceptors/http.loading.interceptor';
import { GlobalErrorHandler } from './services/global-error.handler';
import { StartupService } from './services/startup.service';
import { SyncHttpFetcherService } from './services/sync-http-fetcher.service';
import { InitalizeHttpQueueEffect, InitalizeSyncEffect } from './state/initalizing.effects';
import { NotifyOnUnauthorizedEffect } from './state/notify-on-unauthorized.effect';
import { OpenDialogOnOptimisticError } from './state/open-dialog-on-optimistic-error.effect';
import { SetSyncModelsFetchedReducer, SetSyncModelsFetchingReducer } from './state/sync-fetching.reducer';
import { SyncUserOnLoginEffect } from './state/sync-user-on-login.effect';
import { WipeStateReducer } from './state/wipe-state.reducer';

_registerModelStateConfig(AppModelConfigs);

@NgModule({
  declarations: [],
  imports: [
    StateSyncModule.forRoot({
      fetcher: SyncHttpFetcherService,
      config: AppSyncStateConfig
    }),
    StateAuthModule.forRoot(AppAuthCommandApiMap, AppAuthRedirects),
    StateDbModule,  
    OptimisticHttpModule.forRoot()
  ],
  providers: [   
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthTokensInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true }, 

    { provide: STORE_SETTINGS, useValue: AppStoreSettings},
    
    { provide: BASE_API_URL, useValue: environment.apiUrl},
    { provide: MODEL_FETCHER_BASE_URL, useValue: environment.apiUrl},

    { provide: MODEL_FORM_PROP_TRANSLATIONS, useValue: translations },

    { provide: ROOT_OPTIMISTIC_STATE_PROPS, useValue: AppOptimisticStateProps},

    { provide: STATE_DB_CONFIG, useValue: AppStateDbConfig},  

    { provide: STORE_DEFAULT_STATE, useValue: DefaultState },
    
    { provide: STORE_EFFECTS, useClass: InitalizeSyncEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: InitalizeHttpQueueEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: OpenDialogOnOptimisticError, multi: true },

    { provide: STORE_EFFECTS, useClass: SyncUserOnLoginEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: NotifyOnUnauthorizedEffect, multi: true},
    { provide: STORE_REDUCERS, useValue: WipeStateReducer, multi: true},  
    { provide: STORE_REDUCERS, useValue: SetSyncModelsFetchedReducer, multi: true}, 
    { provide: STORE_REDUCERS, useValue: SetSyncModelsFetchingReducer, multi: true},  
  ]
})
export class CoreModule { 
  constructor(startupService: StartupService){}
}
