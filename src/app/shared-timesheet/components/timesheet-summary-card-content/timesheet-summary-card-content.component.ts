import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TimesheetSummary } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-timesheet-summary-card-content',
  templateUrl: './timesheet-summary-card-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetSummaryCardContentComponent {

  @Input() summary: TimesheetSummary;

  constructor() { }

}
