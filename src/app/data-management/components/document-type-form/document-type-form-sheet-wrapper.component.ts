import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-type-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-document-type-form (finished)="close($event)">
    </app-document-type-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DocumentTypeFormSheetWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<DocumentTypeFormSheetWrapperComponent>,
  ) { 
    super(router, bottomSheetRef, "dokumenttype")
  }
  
}