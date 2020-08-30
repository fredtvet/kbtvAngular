import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';

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