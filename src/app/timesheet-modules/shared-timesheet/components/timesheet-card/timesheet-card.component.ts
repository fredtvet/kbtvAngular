import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { TimesheetStatus } from 'src/app/shared/enums';

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
