import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { AppCommandApiMap } from '@shared-app/const/app-command-api-map.const';
import { AppPersistanceConfig } from '@shared-app/const/app-persistance-config.const';
import { AppStoreSettings } from '@shared-app/const/app-store-settings.const';
import { ModelConfigs } from '@shared-app/const/model-configs.const';
import { translations } from '@shared/translations';
import { BASE_API_URL, OptimisticHttpModule, OPTIMISTIC_STATE_SELECTOR } from 'optimistic-http';
import { PersistanceModule, PERSISTANCE_CONFIG } from 'persistance';
import { environment } from 'src/environments/environment';
import { STORE_DEFAULT_STATE, STORE_EFFECTS, STORE_REDUCERS, STORE_SETTINGS } from 'state-management';
import { COMMAND_API_MAP, StateModelModule, MODEL_CONFIGS, MODEL_PROP_TRANSLATIONS } from 'state-model';
import { StateSyncModule } from 'state-sync';
import { DefaultState } from '../shared-app/const/default-state.const';
import { AppOptimisticState } from '../shared-app/const/optimistic-state-props.const';
import { AppSyncStateConfig } from '../shared-app/const/sync-state.config';
import { ValidationErrorMessages } from '../shared-app/const/validation-error-messages.const';
import { HttpErrorInterceptor, HttpIsOnlineInterceptor, HttpLoadingInterceptor, HttpRefreshTokenInterceptor } from './interceptors';
import { RedirectToUrlEffect } from './services/auth/state/login-success/redirect-to-url.effect';
import { SetCredentialsReducer } from './services/auth/state/login-success/set-credentials.reducer';
import { LoginHttpEffect } from './services/auth/state/login.http.effect';
import { LogoutHttpEffect } from './services/auth/state/logout/logout.http.effect';
import { WipeTokensReducer } from './services/auth/state/logout/wipe-tokens.reducer';
import { RefreshTokenSuccessReducer } from './services/auth/state/refresh-token-success.reducer';
import { RefreshTokenHttpEffect } from './services/auth/state/refresh-token.http.effect';
import { StartupService } from './services/startup.service';
import { SyncHttpFetcherService } from './services/sync-http-fetcher.service';
import { InitalizeHttpQueueEffect, InitalizeSyncEffect } from './state/initalizing.effects';
import { SyncUserOnLoginEffect } from './state/sync-user-on-login.effect';
import { WipeStateReducer } from './state/wipe-state.reducer';

@NgModule({
  declarations: [],
  imports: [
    StateSyncModule.forRoot({
      fetcher: SyncHttpFetcherService,
      config: AppSyncStateConfig
    }),
    PersistanceModule,
    OptimisticHttpModule,
    StateModelModule
  ],
  providers: [   
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefreshTokenInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },

    { provide: STORE_SETTINGS, useValue: AppStoreSettings},

    { provide: BASE_API_URL, useValue: environment.apiUrl},
    { provide: MODEL_CONFIGS, useValue: ModelConfigs },
    { provide: COMMAND_API_MAP, useValue: AppCommandApiMap },
    { provide: MODEL_PROP_TRANSLATIONS, useValue: translations },

    { provide: VALIDATION_ERROR_MESSAGES, useValue: ValidationErrorMessages},

    { provide: OPTIMISTIC_STATE_SELECTOR, useValue: AppOptimisticState},

    { provide: PERSISTANCE_CONFIG, useValue: AppPersistanceConfig},   

    { provide: STORE_DEFAULT_STATE, useValue: DefaultState },

    { provide: STORE_EFFECTS, useClass: InitalizeSyncEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: InitalizeHttpQueueEffect, multi: true },

    { provide: STORE_EFFECTS, useClass: RefreshTokenHttpEffect, multi: true },  
    { provide: STORE_EFFECTS, useClass: LogoutHttpEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: LoginHttpEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: SyncUserOnLoginEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: RedirectToUrlEffect, multi: true},
    
    { provide: STORE_REDUCERS, useValue: RefreshTokenSuccessReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: WipeTokensReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: SetCredentialsReducer, multi: true},
    { provide: STORE_REDUCERS, useValue: WipeStateReducer, multi: true},   
  ]
})
export class CoreModule { 
  constructor(startupService: StartupService){}
}
