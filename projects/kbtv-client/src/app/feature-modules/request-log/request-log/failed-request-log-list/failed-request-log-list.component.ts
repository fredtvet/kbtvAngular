import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-failed-request-log-list',
  templateUrl: './failed-request-log-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedRequestLogListComponent {
  
  @Input() requests: CompletedCommand[];
  
  constructor() { }

  trackByReq = (index:number, cmd: CompletedCommand) => cmd.commandId;
  
}
