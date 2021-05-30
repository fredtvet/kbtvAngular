import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Timesheet } from '@core/models';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-user-timesheet-list-view',
  templateUrl: './user-timesheet-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetListViewComponent {

  @Input() timesheets: Timesheet[];
  @Output() timesheetClicked = new EventEmitter<Timesheet>();
  @Output() filterClicked = new EventEmitter();

  filterButton: AppButton = {
    type: ButtonTypes.Flat,
    text: 'Åpne filter', color: 'accent', icon: 'filter_list',
    callback: () => this.filterClicked.emit()
  }

  onTimesheetClick = (t: Timesheet) => this.timesheetClicked.emit(t);
  
  trackByTimesheet = _trackByModel("timesheets")
}
