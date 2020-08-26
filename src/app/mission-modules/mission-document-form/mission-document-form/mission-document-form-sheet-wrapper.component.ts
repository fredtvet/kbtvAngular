import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-mission-document-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-document-form [missionId]="data?.missionId" (finished)="close()">
    </app-mission-document-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MissionDocumentFormSheetWrapperComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {missionId: number}
  ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Legg til dokument',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();


}