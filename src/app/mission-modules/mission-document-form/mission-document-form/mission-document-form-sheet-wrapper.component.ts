import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { MissionChildFormConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-document-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-document-form [config]="config" (finished)="close($event)">
    </app-mission-document-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentFormSheetWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<MissionDocumentFormSheetWrapperComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public config: MissionChildFormConfig
  ) { 
    super(router, bottomSheetRef, "dokument", config)
  }

}