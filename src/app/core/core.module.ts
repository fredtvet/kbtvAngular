import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from '@dynamic-forms/validation-error-map.interface';
import { ModelModule } from '@model/model.module';
import { DefaultState } from '../shared-app/const/default-state.const';
import { AppOptimisticState } from '../shared-app/const/optimistic-state-props.const';
import { PersistedCriticalStateProps, PersistedStateProps } from '../shared-app/const/persisted-state-props.const';
import { AppSyncStateConfig } from '../shared-app/const/sync-state.config';
import { ValidationErrorMessages } from '../shared-app/const/validation-error-messages.const';
import { STORE_DEFAULT_STATE, STORE_EFFECTS, STORE_REDUCERS } from '@state/injection-tokens';
import { HttpErrorInterceptor, HttpIsOnlineInterceptor, HttpLoadingInterceptor, HttpRefreshTokenInterceptor } from './interceptors';
import { RedirectToUrlEffect } from './services/auth/state/login-success/redirect-to-url.effect';
import { SetCredentialsReducer } from './services/auth/state/login-success/set-credentials.reducer';
import { LoginHttpEffect } from './services/auth/state/login.http.effect';
import { LogoutHttpEffect } from './services/auth/state/logout/logout.http.effect';
import { WipeTokensReducer } from './services/auth/state/logout/wipe-tokens.reducer';
import { RefreshTokenSuccessReducer } from './services/auth/state/refresh-token-success.reducer';
import { RefreshTokenHttpEffect } from './services/auth/state/refresh-token.http.effect';
import { BASE_API_URL, OPTIMISTIC_STATE_SELECTOR } from '@http/injection-tokens.const';
import { OptimisticHttpModule } from '@http/optimistic-http.module';
import { PERSISTED_CRITICAL_STATE_PROPS, PERSISTED_STATE_PROPS } from '@persistance/injection-tokens.const';
import { PersistanceModule } from '@persistance/persistance.module';
import { StartupService } from './services/startup.service';
import { SyncHttpFetcherService } from './services/sync-http-fetcher.service';
import { SyncModule } from '@sync/sync.module';
import { InitalizeHttpQueueEffect, InitalizeSyncEffect } from './state/initalizing.effects';
import { SyncUserOnLoginEffect } from './state/sync-user-on-login.effect';
import { WipeStateReducer } from './state/wipe-state.reducer';
import { ModelConfigs } from '@shared-app/const/model-configs.const';
import { COMMAND_API_MAP, MODEL_CONFIGS, MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { AppCommandApiMap } from '@shared-app/const/app-command-api-map.const';
import { environment } from 'src/environments/environment';
import { translations } from '@shared/translations';

@NgModule({
  declarations: [],
  imports: [
    SyncModule.forRoot({
      fetcher: SyncHttpFetcherService,
      config: AppSyncStateConfig
    }),
    PersistanceModule,
    OptimisticHttpModule,
    ModelModule
  ],
  providers: [   
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefreshTokenInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    
    { provide: BASE_API_URL, useValue: environment.apiUrl},
    { provide: MODEL_CONFIGS, useValue: ModelConfigs },
    { provide: COMMAND_API_MAP, useValue: AppCommandApiMap },
    { provide: MODEL_PROP_TRANSLATIONS, useValue: translations },

    { provide: VALIDATION_ERROR_MESSAGES, useValue: ValidationErrorMessages},

    { provide: OPTIMISTIC_STATE_SELECTOR, useValue: AppOptimisticState},

    { provide: PERSISTED_STATE_PROPS, useValue: PersistedStateProps},   
    { provide: PERSISTED_CRITICAL_STATE_PROPS, useValue: PersistedCriticalStateProps},

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
