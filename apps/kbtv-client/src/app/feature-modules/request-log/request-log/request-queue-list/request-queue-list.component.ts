import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommandIdHeader } from '@core/configurations/command-id-header.const';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { AppRequestDescriberMap } from '@shared-app/constants/app-request-describer-map.const';
import { QueuedCommand } from 'optimistic-http';

@Component({
  selector: 'app-request-queue-list',
  templateUrl: './request-queue-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestQueueListComponent {
  AppRequestDescriberMap = AppRequestDescriberMap;
  
  @Input() requests: QueuedCommand[];
  @Input() isOnline: boolean;

  constructor() { }

  trackByReq = (index:number, cmd: QueuedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers[CommandIdHeader];
}
