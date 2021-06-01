import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { ActionDescriptions } from '@shared-app/constants/action-descriptions.const';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-failed-command-list',
  templateUrl: './failed-command-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedCommandListComponent {
  ActionDescriptions = ActionDescriptions;
  
  @Input() commands: CompletedCommand[];
  
  constructor() { }

  trackByReq = (index:number, cmd: CompletedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers.commandId;
  
}
