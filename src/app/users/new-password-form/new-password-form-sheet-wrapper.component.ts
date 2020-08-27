import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { Router } from '@angular/router';
import { FormConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-new-password-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-new-password-form 
      [config]="config" 
      (finished)="close($event)">
    </app-new-password-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class NewPasswordFormSheetWrapperComponent extends FormSheetWrapperComponent {
  navConfig: SimpleNavConfig;

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<NewPasswordFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) config: FormConfig) {
      super(router, bottomSheetRef, "passord", config)
  }

}
