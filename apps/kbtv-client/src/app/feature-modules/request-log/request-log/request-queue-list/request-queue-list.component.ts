import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActionDescriptions } from '@shared-app/constants/action-descriptions.const';
import { QueuedCommand } from 'optimistic-http';

@Component({
  selector: 'app-request-queue-list',
  templateUrl: './request-queue-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestQueueListComponent {
  ActionDescriptions = ActionDescriptions;
  
  @Input() requests: QueuedCommand[];
  @Input() isOnline: boolean;

  constructor() { }

  trackByReq = (index:number, cmd: QueuedCommand) => cmd.commandId;
}
