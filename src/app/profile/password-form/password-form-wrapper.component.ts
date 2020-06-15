import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-password-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-password-form (finished)="close()">
    </app-password-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class PasswordFormWrapperComponent implements OnInit {
  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<PasswordFormWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Oppdater passord',
      leftBtn: {icon: 'close', callback: this.close} as AppButton
    }
  }

  close = () => this._bottomSheetRef.dismiss();
}
