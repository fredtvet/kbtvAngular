import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActionDescriptions } from '@shared-app/action-descriptions.const';
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
  
  trackByReq = (index:number, cmd: CompletedCommand) => cmd.commandId;

}
