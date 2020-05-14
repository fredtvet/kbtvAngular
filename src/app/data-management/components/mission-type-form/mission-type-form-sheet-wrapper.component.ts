import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-type-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-type-form (finished)="close()">
    </app-mission-type-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionTypeFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<MissionTypeFormSheetWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Registrer oppdragstype',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();
  
}