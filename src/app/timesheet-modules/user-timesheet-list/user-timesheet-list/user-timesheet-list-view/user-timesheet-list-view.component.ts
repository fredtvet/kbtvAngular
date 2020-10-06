import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { _trackByModel } from 'src/app/shared/trackby/track-by-model.helper';

@Component({
  selector: 'app-user-timesheet-list-view',
  templateUrl: './user-timesheet-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetListViewComponent {

  @Input() timesheets: Timesheet[];
  @Output() editClicked = new EventEmitter<string>();
  @Output() filterClicked = new EventEmitter();

  editTimesheet = (id: string) => this.editClicked.emit(id);
  
  trackByTimesheet = _trackByModel("timesheets")
}
