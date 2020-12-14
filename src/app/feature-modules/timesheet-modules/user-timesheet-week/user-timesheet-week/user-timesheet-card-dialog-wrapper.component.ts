import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _find } from '@array/find.helper';
import { Store } from '@state/store';
import { map } from 'rxjs/operators';
import { StoreState } from '../store-state.interface';

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
    this.store.select$(["userTimesheets", "missions"]).pipe(map(state => {
        const timesheet = _find(state.userTimesheets, this.timesheetId, "id");
        if(!timesheet) return;
        return {...timesheet, mission: _find(state.missions, timesheet.missionId, "id")};
    }))

  constructor(
    private store: Store<StoreState>,
    @Inject(MAT_DIALOG_DATA) public timesheetId: string
  ) {}
  
}
