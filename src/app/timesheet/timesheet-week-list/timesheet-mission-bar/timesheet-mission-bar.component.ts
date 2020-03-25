import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Timesheet, Mission } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetCardDialogWrapperComponent } from '../../components/timesheet-card-dialog-wrapper/timesheet-card-dialog-wrapper.component';

@Component({
  selector: 'app-timesheet-mission-bar',
  templateUrl: './timesheet-mission-bar.component.html',
  styleUrls: ['./timesheet-mission-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetMissionBarComponent {
  
  @Input() timesheet: Timesheet = new Timesheet();
  @Input() isHandset: boolean = true;

  constructor(public dialog: MatDialog) { }
  
  openDialog(): void {
    this.dialog.open(TimesheetCardDialogWrapperComponent, {
      data: this.timesheet.id
    });
  }

}
