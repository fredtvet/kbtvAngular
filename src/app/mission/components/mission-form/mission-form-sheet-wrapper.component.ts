import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-form 
      [missionIdPreset]="data?.missionIdPreset"
      (finished)="close()">
    </app-mission-form>
  </app-simple-top-nav> 
  `
})
export class MissionFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MissionFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {missionIdPreset: number}) { }

  ngOnInit() {
    this.navConfig = {
      title: (this.data && this.data.missionIdPreset) ? 'Rediger oppdrag' : 'Registrer oppdrag',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();


}
