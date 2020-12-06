import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';

@Component({
  selector: 'app-timesheet-admin-list-view',
  templateUrl: './timesheet-admin-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListViewComponent {

  @Input() timesheets: Timesheet[];

  @Output() timesheetStatusToggled = new EventEmitter<Timesheet>();

  constructor() { }

  toggleTimesheetStatus = (timesheet: Timesheet): void => 
    this.timesheetStatusToggled.emit(timesheet)

  trackById = _trackByModel("timesheets");
  
}
