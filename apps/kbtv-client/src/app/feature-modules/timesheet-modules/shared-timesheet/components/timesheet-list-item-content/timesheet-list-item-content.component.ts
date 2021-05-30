import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timesheet } from '@core/models';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { TimesheetStatus } from '@shared-app/enums/timesheet-status.enum';

@Component({
  selector: 'app-timesheet-list-item-content',
  templateUrl: './timesheet-list-item-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetListItemContentComponent { 
  ButtonTypes = ButtonTypes;
  Status = TimesheetStatus;
  
  @Input() timesheet: Timesheet;

  constructor() { }

}
