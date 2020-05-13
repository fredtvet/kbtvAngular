import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { Mission } from 'src/app/shared/models';
import { UserTimesheetService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-timesheet-form 
      [datePreset]="data?.datePreset" 
      [missionPreset]="data?.missionPreset" 
      [timesheetIdPreset]="data?.timesheetIdPreset"
      (finished)="close()">
  </app-timesheet-form>
  </app-simple-top-nav> 
  `
})
export class TimesheetFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _userTimesheetService: UserTimesheetService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {datePreset: Date, missionPreset: Mission, timesheetIdPreset: number}) { }

  ngOnInit() {
    let isCreateForm = (!this.data || !this.data.timesheetIdPreset);
    this.navConfig = {
      title: !isCreateForm ? 'Rediger time' : 'Registrer time',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: !isCreateForm ? [{icon: 'delete_forever', callback: this.deleteTimesheet} as AppButton] : undefined
    }
  }

  close = () => this._bottomSheetRef.dismiss();

  deleteTimesheet = () => 
    this._userTimesheetService.delete$(this.data.timesheetIdPreset).subscribe(x => this.close());
  

}
