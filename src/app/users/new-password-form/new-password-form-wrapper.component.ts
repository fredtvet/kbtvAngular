import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-new-password-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-new-password-form 
      [userName]="data.userName" 
      (finished)="close()">
    </app-new-password-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class NewPasswordFormWrapperComponent implements OnInit {
  navConfig: SimpleNavConfig;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NewPasswordFormWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {userName: string}) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Nytt passord',
      leftBtn: {icon: 'close', callback: this.close} as AppButton
    }
  }

  close = () => this._bottomSheetRef.dismiss();
}
