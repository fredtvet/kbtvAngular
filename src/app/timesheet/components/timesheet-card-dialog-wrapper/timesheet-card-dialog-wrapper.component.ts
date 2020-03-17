import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  templateUrl: './timesheet-card-dialog-wrapper.component.html'
})
export class TimesheetCardDialogWrapperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: number
    ) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
