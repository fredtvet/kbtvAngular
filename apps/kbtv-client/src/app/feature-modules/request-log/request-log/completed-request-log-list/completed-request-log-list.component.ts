import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { AppRequestDescriberMap } from '@shared-app/constants/app-request-describer-map.const';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-completed-request-log-list.',
  templateUrl: './completed-request-log-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedRequestLogListComponent {
  AppRequestDescriberMap = AppRequestDescriberMap;
  
  @Input() requests: CompletedCommand[];

  constructor() {}
  
  trackByReq = (index:number, cmd: CompletedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers.commandId;

}
