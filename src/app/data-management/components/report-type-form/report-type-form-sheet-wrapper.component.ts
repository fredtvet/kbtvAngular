import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-report-type-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-report-type-form (finished)="close()">
    </app-report-type-form>
  </app-simple-top-nav> 
  `
})

export class ReportTypeFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ReportTypeFormSheetWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Registrer rapporttype',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();
  
}