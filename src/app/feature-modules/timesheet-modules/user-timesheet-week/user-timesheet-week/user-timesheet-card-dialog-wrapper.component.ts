import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { _find } from '@shared-app/helpers/array/find.helper';
import { Store } from '@state/store';
import { StoreState } from '../store-state.interface';
import { UserTimesheetWeekFacade } from './user-timesheet-week.facade';

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

  timesheet$ = 
    this.store.select$(["userTimesheets", "missions"], false).pipe(map(state => {
        const timesheet = _find(state.userTimesheets, this.timesheetId, "id");
        if(!timesheet) return null;
        timesheet.mission = _find(state.missions, timesheet.missionId, "id");
        return timesheet;
    }))

  constructor(
    private store: Store<StoreState>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: string
  ) {}
  
}
