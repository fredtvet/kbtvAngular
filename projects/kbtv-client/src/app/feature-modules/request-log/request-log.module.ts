import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RequestLogRoutingModule } from './request-log-routing.module';
import { RequestLogComponent } from './request-log/request-log.component';
import { RequestQueueListComponent } from './request-log/request-queue-list/request-queue-list.component';
import { FailedRequestLogListComponent } from './request-log/failed-request-log-list/failed-request-log-list.component';
import { CompletedRequestLogListComponent } from './request-log/completed-request-log-list/completed-request-log-list.component';

@NgModule({
  declarations: [
    RequestLogComponent,
    FailedRequestLogListComponent,
    RequestQueueListComponent,
    CompletedRequestLogListComponent
  ],
  imports: [ 
    SharedModule,
    RequestLogRoutingModule
  ],
  providers: []
})
export class RequestLogModule {}  

