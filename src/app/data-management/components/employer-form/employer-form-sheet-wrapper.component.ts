import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, FormSheetWrapperComponent } from 'src/app/shared/components';
import { DataManagementStore } from '../../data-management.store';
import { EmployerFormConfig } from '../../interfaces/employer-form-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-employer-form
      [config]="config"
      (finished)="close($event)">
    </app-employer-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerFormSheetWrapperComponent extends FormSheetWrapperComponent {

  constructor(
    router: Router,
    bottomSheetRef: MatBottomSheetRef<EmployerFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) config: EmployerFormConfig) { 
      super(router, bottomSheetRef, "oppdragsgiver", config)
    } 

}