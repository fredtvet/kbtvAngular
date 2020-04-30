import { Component, OnInit, Input } from '@angular/core';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-summary-card',
  templateUrl: './timesheet-summary-card.component.html'
})
export class TimesheetSummaryCardComponent {

  @Input() summary: TimesheetSummary;

  constructor() { }

}
