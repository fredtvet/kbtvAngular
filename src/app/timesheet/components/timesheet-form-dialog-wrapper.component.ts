import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-form-dialog-wrapper',
  template: `
  <app-timesheet-form [datePreset]="data.date" [missionPreset]="data.missionIdPreset"></app-timesheet-form>
  `
})
export class TimesheetFormDialogWrapperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimesheetFormDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
