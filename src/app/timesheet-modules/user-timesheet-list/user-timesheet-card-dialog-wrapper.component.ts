import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { _find } from 'src/app/shared-app/helpers/array/find.helper';
import { UserTimesheetListStore } from './user-timesheet-list.store';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-timesheet-card 
    [timesheet]="timesheet$ | async">
  </app-timesheet-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserTimesheetCardDialogWrapperComponent {

  timesheet$ = this.store.filteredTimesheets$.pipe(
    map(arr => _find(arr.records, this.timesheetId, "id"))
  )

  constructor(
    private store: UserTimesheetListStore,
    public dialogRef: MatDialogRef<UserTimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: string
    ) {}
}
