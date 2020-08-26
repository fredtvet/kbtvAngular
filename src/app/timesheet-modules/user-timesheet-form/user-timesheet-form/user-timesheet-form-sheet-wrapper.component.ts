import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { UserTimesheetFormStore } from '../user-timesheet-form.store';
import { TimesheetFormConfig } from './timesheet-form-config.interface';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-user-timesheet-form 
      [config]="config"
      (finished)="close()">
    </app-user-timesheet-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private store: UserTimesheetFormStore,
    private _bottomSheetRef: MatBottomSheetRef<UserTimesheetFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public config: TimesheetFormConfig) { }

  ngOnInit() {
    let isCreateForm = (!this.config || !this.config.idPreset);
    this.navConfig = {
      title: !isCreateForm ? 'Rediger time' : 'Registrer time',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: !isCreateForm ? [{icon: 'delete_forever', callback: this.deleteTimesheet} as AppButton] : undefined
    }
  }

  close = () => this._bottomSheetRef.dismiss();

  deleteTimesheet = () => 
    this.store.delete$(this.config.idPreset).subscribe(x => this.close());
  

}
