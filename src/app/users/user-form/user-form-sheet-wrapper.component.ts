import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { FormConfig } from 'src/app/shared/interfaces';
import { UsersStore } from '../users.store';

@Component({
  selector: 'app-user-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-user-form 
      [config]="config"
      (finished)="close($event)">
  </app-user-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormSheetWrapperComponent extends FormSheetWrapperComponent {


  constructor(
    store: UsersStore,
    router: Router,
    dialog: MatDialog,
    bottomSheetRef: MatBottomSheetRef<UserFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) config: FormConfig) {
      super(router, bottomSheetRef, "bruker", config, dialog, store)
  }
  
}
