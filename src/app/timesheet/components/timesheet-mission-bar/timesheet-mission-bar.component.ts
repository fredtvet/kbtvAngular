import { Component, OnInit, Input } from '@angular/core';
import { Timesheet, Mission } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetCardDialogWrapperComponent } from '../timesheet-card-dialog-wrapper/timesheet-card-dialog-wrapper.component';

@Component({
  selector: 'app-timesheet-mission-bar',
  templateUrl: './timesheet-mission-bar.component.html',
  styleUrls: ['./timesheet-mission-bar.component.scss']
})
export class TimesheetMissionBarComponent implements OnInit {

  @Input() timesheet: Timesheet = new Timesheet();
  @Input() isHandset: boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialog.open(TimesheetCardDialogWrapperComponent, {
      data: this.timesheet.id
    });
  }

}
