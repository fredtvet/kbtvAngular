import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { UserTimesheetFormStore } from '../user-timesheet-form.store';
import { TimesheetFormConfig } from 'src/app/shared-timesheet/interfaces';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-user-timesheet-form 
      [config]="config"
      (finished)="close($event)">
    </app-user-timesheet-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetFormSheetWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    store: UserTimesheetFormStore,
    router: Router,
    bottomSheetRef: MatBottomSheetRef<UserTimesheetFormSheetWrapperComponent>,  
    dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) config: TimesheetFormConfig) { 
      super(router, bottomSheetRef, "time", config, dialog, store)
  }

}
