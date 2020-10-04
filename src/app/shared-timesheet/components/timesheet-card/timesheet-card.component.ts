import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetCardComponent {
  @Input() adminView: boolean = false;
  @Input() timesheet: Timesheet;
  @Input() loading: boolean;
  @Output() statusChanged = new EventEmitter<{id: string, status: TimesheetStatus}>();
  @Output() editClicked = new EventEmitter<string>();

  constructor() { }

  editTimesheet = () =>  this.editClicked.emit(this.timesheet.id);
  
  changeStatus = () => {
    let status = (this.timesheet.status === TimesheetStatus.Open) ? TimesheetStatus.Confirmed : TimesheetStatus.Open;
    this.statusChanged.emit({id: this.timesheet.id, status})
  };
}
