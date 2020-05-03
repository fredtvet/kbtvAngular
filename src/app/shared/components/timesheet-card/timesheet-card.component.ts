import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { TimesheetStatus } from '../../enums/timesheet-status.enum';
import { Timesheet } from '../../models/timesheet.model';
import { Roles } from '../../enums/roles.enum';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
})

export class TimesheetCardComponent {
  Roles = Roles;

  @Input() adminView: boolean = false;
  @Input() timesheet: Timesheet;
  @Output() statusChanged = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  deleteTimesheet = () => this.deleted.emit(this.timesheet.id);

  changeStatus = () => {
    let status = this.timesheet.status === TimesheetStatus.Open ? TimesheetStatus.Confirmed : TimesheetStatus.Open;
    this.statusChanged.emit({id: this.timesheet.id, status})
  };
}
