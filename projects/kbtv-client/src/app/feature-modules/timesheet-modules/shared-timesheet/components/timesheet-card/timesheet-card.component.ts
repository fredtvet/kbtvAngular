import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timesheet } from '@core/models';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { TimesheetStatus } from '@shared/enums';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetCardComponent { 
  ButtonTypes = ButtonTypes;
  Status = TimesheetStatus;
  
  @Input() timesheet: Timesheet;

  constructor() { }

}
