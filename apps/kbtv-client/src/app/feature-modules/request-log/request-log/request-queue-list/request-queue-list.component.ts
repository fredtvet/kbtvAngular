import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { QueuedCommand } from 'optimistic-http';

@Component({
  selector: 'app-request-queue-list',
  templateUrl: './request-queue-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestQueueListComponent {

  @Input() requests: QueuedCommand[];
  @Input() isOnline: boolean;

  constructor() { }

  trackByReq = (index:number, cmd: QueuedCommand) => cmd.commandId;
}
