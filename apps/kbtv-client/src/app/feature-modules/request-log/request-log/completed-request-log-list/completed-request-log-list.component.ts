import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { ActionDescriptions } from '@shared-app/constants/action-descriptions.const';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-completed-request-log-list.',
  templateUrl: './completed-request-log-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedRequestLogListComponent {
  ActionDescriptions = ActionDescriptions;
  
  @Input() requests: CompletedCommand[];

  constructor() {}
  
  trackByReq = (index:number, cmd: CompletedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers.commandId;

}
