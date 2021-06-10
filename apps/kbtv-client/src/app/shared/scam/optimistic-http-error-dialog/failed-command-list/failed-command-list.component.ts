import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { CommandIdHeader } from '@core/configurations/command-id-header.const';
import { AppOptimisticHttpRequest } from '@core/configurations/model/model-requests.interface';
import { StateMissions } from '@core/state/global-state.interfaces';
import { AppRequestDescriberMap } from '@shared-app/constants/app-request-describer-map.const';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-failed-command-list',
  templateUrl: './failed-command-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedCommandListComponent {
  AppRequestDescriberMap = AppRequestDescriberMap;
  
  @Input() commands: CompletedCommand[];
  @Input() state: StateMissions;
  
  constructor() { }

  trackByReq = (index:number, cmd: CompletedCommand) => 
    (<AppOptimisticHttpRequest> cmd.request).headers[CommandIdHeader];
  
}
