import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-document-type-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-document-type-form (finished)="close()">
    </app-document-type-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DocumentTypeFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef<DocumentTypeFormSheetWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Registrer rapporttype',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();
  
}