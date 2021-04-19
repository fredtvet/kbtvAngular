import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { ACTION_REQUEST_MAP } from './injection-tokens.const';
import { ActionRequestMap } from './interfaces';
import { DispatchHttpEffect } from './state/dispatch-http/dispatch-http.effect';
import { DispatchHttpReducer } from './state/dispatch-http/dispatch-http.reducer';
import { HttpErrorEffect } from './state/http-error/http-error.effect';
import { HttpErrorReducer } from './state/http-error/http-error.reducer';
import { HttpQueuePushEffect } from './state/http-queue-push/http-queue-push.effect';
import { HttpQueuePushReducer } from './state/http-queue-push/http-queue-push.reducer';
import { HttpQueueShiftReducer } from './state/http-queue-shift.reducer';
import { HttpSuccessEffect } from './state/http-success/http-success.effect';
import { HttpSuccessReducer } from './state/http-success/http-success.reducer';
import { OptimisticRequestQueuerEffect } from './state/optimistic-request-queuer.effect';
import { AppendRequestLogReducer } from './state/request-log/append-request-log.reducer';

/** Responsible for providing core injectables. 
 *  Use forRoot & forFeature functions to configure providers. */
@NgModule({})
export class OptimisticHttpModule { 
  static forRoot(rootActionRequestMap?: ActionRequestMap<string>): ModuleWithProviders<OptimisticHttpModule> {
    let providers: Provider[] = [
      { provide: STORE_EFFECTS, useClass: DispatchHttpEffect, multi: true },
      { provide: STORE_EFFECTS, useClass: HttpQueuePushEffect, multi: true },
      { provide: STORE_EFFECTS, useClass: HttpSuccessEffect, multi: true },  
      { provide: STORE_EFFECTS, useClass: HttpErrorEffect, multi: true },
  
      { provide: STORE_REDUCERS, useValue: AppendRequestLogReducer, multi: true },
      { provide: STORE_REDUCERS, useValue: DispatchHttpReducer, multi: true },
      { provide: STORE_REDUCERS, useValue: HttpQueuePushReducer, multi: true },
      { provide: STORE_REDUCERS, useValue: HttpErrorReducer, multi: true },
      { provide: STORE_REDUCERS, useValue: HttpSuccessReducer, multi: true },
      { provide: STORE_REDUCERS, useValue: HttpQueueShiftReducer, multi: true },
    ];

    if(rootActionRequestMap) providers = providers.concat([
      { provide: ACTION_REQUEST_MAP, useValue: rootActionRequestMap },   
      { provide: STORE_EFFECTS, useClass: OptimisticRequestQueuerEffect, multi: true },
    ])

    return {
      ngModule: OptimisticHttpModule,
      providers
    }
  }

  static forFeature(featureActionRequestMap: ActionRequestMap<string>): ModuleWithProviders<OptimisticHttpModule> {
    return {
      ngModule: OptimisticHttpModule,
      providers: [
        { provide: ACTION_REQUEST_MAP, useValue: featureActionRequestMap },     
        { provide: STORE_EFFECTS, useClass: OptimisticRequestQueuerEffect, multi: true },  
      ]
    }
  }
}
