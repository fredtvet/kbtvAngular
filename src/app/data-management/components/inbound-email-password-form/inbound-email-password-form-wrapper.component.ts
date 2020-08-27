import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { Router } from '@angular/router';

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
export class InboundEmailPasswordFormWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<InboundEmailPasswordFormWrapperComponent>
    ) {
      super(router, bottomSheetRef, "epostpassord")
  }
  
}
