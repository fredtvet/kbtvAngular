import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timesheet } from '@core/models';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { TimesheetStatus } from '@shared/enums';

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
