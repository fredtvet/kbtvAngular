import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserTimesheetService } from 'src/app/core/services';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-timesheet-card 
    [timesheet]="timesheet$ | async" 
    (deleted)="deleteTimesheet()"
    (confirmed)="confirmTimesheet()">
  </app-timesheet-card>
  `
})

export class TimesheetCardDialogWrapperComponent {

  timesheet$ = this.userTimesheetService.getWithMission$(this.timesheetId);

  constructor(
    private userTimesheetService: UserTimesheetService,
    public dialogRef: MatDialogRef<TimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: number
    ) {}

  deleteTimesheet(){
    this.userTimesheetService.delete$(this.timesheetId)
      .subscribe(x => this.dialogRef.close());
  }

  confirmTimesheet(){
    this.userTimesheetService.changeStatus$(this.timesheetId, TimesheetStatus.Confirmed)
      .subscribe(x => this.dialogRef.close());
  }
}
