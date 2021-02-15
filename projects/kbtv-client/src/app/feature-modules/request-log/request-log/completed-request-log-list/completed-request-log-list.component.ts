import { Component, Input } from '@angular/core';
import { CompletedCommand } from 'optimistic-http';

@Component({
  selector: 'app-completed-request-log-list.',
  templateUrl: './completed-request-log-list.component.html'
})
export class CompletedRequestLogListComponent {

  @Input() requests: CompletedCommand[];

  constructor() {}
  
  trackByReq = (index:number, cmd: CompletedCommand) => cmd.commandId;

}
