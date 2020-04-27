import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { listAnimation } from 'src/app/shared/animations/list.animation';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-day-label',
  templateUrl: './timesheet-day-label.component.html',
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetDayLabelComponent {

  @Input() date: Date;
  @Output() labelClicked = new EventEmitter();

  constructor(public dialog: MatDialog) {}

}
