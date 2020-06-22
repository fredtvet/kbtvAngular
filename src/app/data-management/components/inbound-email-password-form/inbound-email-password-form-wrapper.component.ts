import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-inbound-email-password-form-wrapper-component',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-inbound-email-password-form (finished)="close()">
    </app-inbound-email-password-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboundEmailPasswordFormWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<InboundEmailPasswordFormWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Registrer epostpassord',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();

}
