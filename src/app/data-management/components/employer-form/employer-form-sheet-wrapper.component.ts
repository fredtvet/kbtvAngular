import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FormSheetWrapperComponent } from 'src/app/shared/components';
import { EmployerFormConfig } from '../../interfaces/employer-form-config.interface';

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