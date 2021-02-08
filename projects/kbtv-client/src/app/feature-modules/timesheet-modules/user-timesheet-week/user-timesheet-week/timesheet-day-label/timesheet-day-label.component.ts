import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timesheet-day-label',
  templateUrl: './timesheet-day-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetDayLabelComponent {

  @Input() date: Date;
  @Output() labelClicked = new EventEmitter();

  constructor() {}

}
