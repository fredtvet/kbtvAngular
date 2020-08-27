import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission-type-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-type-form (finished)="close($event)">
    </app-mission-type-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionTypeFormSheetWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<MissionTypeFormSheetWrapperComponent>) {
      super(router, bottomSheetRef, "oppdragstype")
  }
  
}