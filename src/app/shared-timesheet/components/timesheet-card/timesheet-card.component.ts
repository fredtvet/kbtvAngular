import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';
import { TimesheetStatus } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetCardComponent {
  Roles = Roles;

  @Input() adminView: boolean = false;
  @Input() timesheet: Timesheet;
  @Output() statusChanged = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();

  constructor() { }

  deleteTimesheet = () => this.deleteClicked.emit(this.timesheet.id);

  editTimesheet = () =>  this.editClicked.emit(this.timesheet.id);
  
  changeStatus = () => {
    let status = (this.timesheet.status === TimesheetStatus.Open) ? TimesheetStatus.Confirmed : TimesheetStatus.Open;
    this.statusChanged.emit({id: this.timesheet.id, status})
  };
}
