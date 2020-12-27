import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timesheet } from '@core/models';
import { ButtonTypes } from '@shared-app/enums';
import { AppButton } from '@shared-app/interfaces';
import { TimesheetStatus } from '@shared/enums';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetCardComponent { 
  ButtonTypes = ButtonTypes;
  Status = TimesheetStatus;
  
  @Input() timesheet: Timesheet;
  @Input() actionButton: AppButton;

  constructor() { }

}
