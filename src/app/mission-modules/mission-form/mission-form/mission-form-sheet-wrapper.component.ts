import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { FormConfig } from 'src/app/shared/interfaces';
import { MissionFormStore } from '../mission-form.store';

@Component({
  selector: 'app-mission-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-form 
      [config]="config"
      (finished)="close($event)">
    </app-mission-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class MissionFormSheetWrapperComponent extends FormSheetWrapperComponent {
  constructor(
    store: MissionFormStore,
    router: Router,
    bottomSheetRef: MatBottomSheetRef<MissionFormSheetWrapperComponent>,  
    dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) config: FormConfig) { 
      super(router, bottomSheetRef, `oppdrag`, config, dialog, store) 
    }
}
