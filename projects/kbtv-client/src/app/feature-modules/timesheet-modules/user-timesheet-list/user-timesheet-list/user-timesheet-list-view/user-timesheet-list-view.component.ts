import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from '@core/models';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';

@Component({
  selector: 'app-user-timesheet-list-view',
  templateUrl: './user-timesheet-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetListViewComponent {

  @Input() timesheets: Timesheet[];
  @Output() timesheetClicked = new EventEmitter<Timesheet>();
  @Output() filterClicked = new EventEmitter();

  onTimesheetClick = (t: Timesheet) => this.timesheetClicked.emit(t);
  
  trackByTimesheet = _trackByModel("timesheets")
}
