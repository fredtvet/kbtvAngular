import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';
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
    map(arr => this.arrayHelperService.find(arr.records, this.timesheetId, "id"))
  )

  constructor(
    private store: UserTimesheetListStore,
    private arrayHelperService: ArrayHelperService,
    public dialogRef: MatDialogRef<UserTimesheetCardDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: string
    ) {}
}
