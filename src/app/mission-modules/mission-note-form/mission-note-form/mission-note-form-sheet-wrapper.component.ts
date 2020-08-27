import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { MissionChildFormConfig } from 'src/app/shared/interfaces';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { MissionNoteFormStore } from '../mission-note-form.store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-note-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-note-form 
      [config]="config"
      (finished)="close($event)">
    </app-mission-note-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteFormSheetWrapperComponent extends FormSheetWrapperComponent {
  
  constructor(
    store: MissionNoteFormStore,
    router: Router,
    bottomSheetRef: MatBottomSheetRef<MissionNoteFormSheetWrapperComponent>, 
    dialog: MatDialog, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public config: MissionChildFormConfig) {
      super(router, bottomSheetRef, "notat", config, dialog, store)
    }

}
