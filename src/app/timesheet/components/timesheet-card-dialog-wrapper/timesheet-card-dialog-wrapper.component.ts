import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timesheet } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  templateUrl: './timesheet-card-dialog-wrapper.component.html',
  styleUrls: ['./timesheet-card-dialog-wrapper.component.scss']
})
export class TimesheetCardDialogWrapperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheet: Timesheet
    ) { }

  ngOnInit() {
  }

}
