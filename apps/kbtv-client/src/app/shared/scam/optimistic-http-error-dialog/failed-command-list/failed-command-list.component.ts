import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
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

  trackByReq = (index:number, cmd: CompletedCommand) => cmd.commandId;
  
}
