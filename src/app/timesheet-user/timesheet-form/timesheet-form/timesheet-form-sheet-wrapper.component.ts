import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { UserTimesheetService } from 'src/app/core/services';
import { TimesheetFormConfig } from './timesheet-form-config.interface';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-timesheet-form 
      [config]="config"
      (finished)="close()">
  </app-timesheet-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _userTimesheetService: UserTimesheetService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetFormSheetWrapperComponent>,  
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
    this._userTimesheetService.delete$(this.config.idPreset).subscribe(x => this.close());
  

}
