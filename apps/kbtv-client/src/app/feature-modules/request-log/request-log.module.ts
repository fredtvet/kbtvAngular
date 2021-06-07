import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RequestLogRoutingModule } from './request-log-routing.module';
import { CompletedRequestLogListComponent } from './request-log/completed-request-log-list/completed-request-log-list.component';
import { FailedRequestLogListComponent } from './request-log/failed-request-log-list/failed-request-log-list.component';
import { RequestLogComponent } from './request-log/request-log.component';
import { RequestQueueListComponent } from './request-log/request-queue-list/request-queue-list.component';

@NgModule({
  declarations: [
    RequestLogComponent,
    RequestQueueListComponent,
    CompletedRequestLogListComponent,
    FailedRequestLogListComponent,
  ],
  imports: [ 
    SharedModule,
    RequestLogRoutingModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RequestLogModule {}  

