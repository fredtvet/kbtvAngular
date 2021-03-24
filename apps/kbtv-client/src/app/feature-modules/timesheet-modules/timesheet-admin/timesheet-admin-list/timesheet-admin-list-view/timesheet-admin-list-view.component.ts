import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from '@core/models';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';

@Component({
  selector: 'app-timesheet-admin-list-view',
  templateUrl: './timesheet-admin-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListViewComponent {
  
  @Input() timesheets: Timesheet[];

  @Output() statusToggled = new EventEmitter<Timesheet>();
  @Output() timesheetClicked = new EventEmitter<Timesheet>();

  onLockClick = (timesheet: Timesheet): void => {
    this.statusToggled.emit(timesheet)
  }

  onClick = (timesheet: Timesheet): void => 
    this.timesheetClicked.emit(timesheet);
  
  trackById = _trackByModel("timesheets");
  
}
