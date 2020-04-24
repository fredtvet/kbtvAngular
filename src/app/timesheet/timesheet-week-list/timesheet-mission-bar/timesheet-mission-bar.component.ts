import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Timesheet, Mission } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetCardDialogWrapperComponent } from '../../components/timesheet-card-dialog-wrapper.component';

@Component({
  selector: 'app-timesheet-mission-bar',
  templateUrl: './timesheet-mission-bar.component.html',
  styleUrls: ['./timesheet-mission-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetMissionBarComponent {
  
  @Input() timesheet: Timesheet = new Timesheet();
  @Output() barClicked = new EventEmitter();

  constructor(public dialog: MatDialog) { }
  
  clickBar(): void { this.barClicked.emit(this.timesheet.id); }

}
