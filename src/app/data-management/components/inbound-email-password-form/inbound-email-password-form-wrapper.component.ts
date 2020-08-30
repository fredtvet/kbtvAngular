import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-inbound-email-password-form-wrapper-component',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-inbound-email-password-form (finished)="close($event)">
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
