import { Component, OnInit, Input } from '@angular/core';
import { TimesheetSummary } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-week-card',
  templateUrl: './timesheet-week-card.component.html'
})
export class TimesheetWeekCardComponent {

  @Input() summary: TimesheetSummary;

  constructor() { }

}
