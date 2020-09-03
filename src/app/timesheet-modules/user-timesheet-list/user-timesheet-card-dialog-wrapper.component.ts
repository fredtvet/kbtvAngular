import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { UserTimesheetListStore } from './user-timesheet-list.store';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-timesheet-card 
    [timesheet]="timesheet$ | async" 
    (deleteClicked)="deleteTimesheet()">
  </app-timesheet-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserTimesheetCardDialogWrapperComponent {

  timesheet$ = this.store.filteredTimesheets$.pipe(map(arr => arr.find(x => x.id === this.timesheetId)))

  constructor(
    private store: UserTimesheetListStore,
    public dialogRef: MatDialogRef<UserTimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: number
    ) {}

  deleteTimesheet(){
    this.store.delete$(this.timesheetId)
      .subscribe(x => this.dialogRef.close());
  }
}
