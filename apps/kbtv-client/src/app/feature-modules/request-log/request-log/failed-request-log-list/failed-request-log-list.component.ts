import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { AppRequestDescriberMap } from '@shared-app/constants/app-request-describer-map.const';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-failed-request-log-list',
  templateUrl: './failed-request-log-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedRequestLogListComponent {
  AppRequestDescriberMap = AppRequestDescriberMap;
  
  @Input() requests: CompletedCommand[];
  
  constructor() { }

  trackByReq = (index:number, cmd: CompletedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers.commandId;
  
}
