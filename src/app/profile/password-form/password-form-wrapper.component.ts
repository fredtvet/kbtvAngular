import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-password-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-password-form (finished)="close($event)">
    </app-password-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class PasswordFormWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<PasswordFormWrapperComponent>
  ) { 
    super(router, bottomSheetRef, "passord", {customTitle: "Oppdater passord"})
  }

}
