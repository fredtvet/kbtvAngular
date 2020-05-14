import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-report-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-report-form [missionId]="data?.missionId" (finished)="close()">
    </app-mission-report-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionReportFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MissionReportFormSheetWrapperComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {missionId: number}
  ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Legg til rapport',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();


}