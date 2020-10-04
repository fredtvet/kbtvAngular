import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-day-label',
  templateUrl: './timesheet-day-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetDayLabelComponent {

  @Input() date: Date;
  @Output() labelClicked = new EventEmitter();

  constructor(public dialog: MatDialog) {}
  ngOnChanges(): void {
    console.log('TimesheetDayLabelComponent')
  }
}
