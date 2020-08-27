import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-profile-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-profile-form (finished)="close($event)">
    </app-profile-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class ProfileFormWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<ProfileFormWrapperComponent>
  ) { 
    super(router, bottomSheetRef, "profil", {customTitle: "Oppdater profil"})
  }
}
