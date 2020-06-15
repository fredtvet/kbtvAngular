import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-profile-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-profile-form (finished)="close()">
    </app-profile-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class ProfileFormWrapperComponent implements OnInit {
  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ProfileFormWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Oppdater profil',
      leftBtn: {icon: 'close', callback: this.close} as AppButton
    }
  }

  close = () => this._bottomSheetRef.dismiss();
}
