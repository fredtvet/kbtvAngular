import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Timesheet } from 'src/app/core/models';
import { _getWeekOfYear } from 'src/app/shared-app/helpers/datetime/get-week-of-year.helper';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';
import { ViewModel } from '../view-model.interface';

@Component({
  selector: "app-user-timesheet-week-view",
  templateUrl: "./user-timesheet-week-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekViewComponent {

  @Input() vm: ViewModel;
  
  @Output() timesheetClicked = new EventEmitter<Timesheet>();
  @Output() labelClicked = new EventEmitter<Date>();

  constructor() {}
    
  trackByTimesheet = _trackByModel("timesheets");

}
