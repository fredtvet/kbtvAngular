import { NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DispatchHttpEffect } from './state/dispatch-http/dispatch-http.effect';
import { DispatchHttpReducer } from './state/dispatch-http/dispatch-http.reducer';
import { HttpErrorEffect } from './state/http-error/http-error.effect';
import { HttpErrorReducer } from './state/http-error/http-error.reducer';
import { HttpQueuePushEffect } from './state/http-queue-push/http-queue-push.effect';
import { HttpQueuePushReducer } from './state/http-queue-push/http-queue-push.reducer';
import { HttpQueueShiftReducer } from './state/http-queue-shift.reducer';
import { HttpSuccessEffect } from './state/http-success/http-success.effect';
import { HttpSuccessReducer } from './state/http-success/http-success.reducer';
import { OptimisticHttpEffect } from './state/optimistic-http.effect';
import { AppendRequestLogReducer } from './state/request-log/append-request-log.reducer';

/** Responsible for providing core injectables. 
 *  Should only be imported in root. */
@NgModule({
  providers: [  
    { provide: STORE_EFFECTS, useClass: DispatchHttpEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: HttpQueuePushEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: HttpSuccessEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: OptimisticHttpEffect, multi: true },  
    { provide: STORE_EFFECTS, useClass: HttpErrorEffect, multi: true },

    { provide: STORE_REDUCERS, useValue: AppendRequestLogReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: DispatchHttpReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: HttpQueuePushReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: HttpErrorReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: HttpSuccessReducer, multi: true },
    { provide: STORE_REDUCERS, useValue: HttpQueueShiftReducer, multi: true },
  ]
})
export class OptimisticHttpModule { }
