import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { Mission, User } from 'src/app/core/models';
import { AppButton, SimpleNavConfig, TimesheetCriteria } from 'src/app/shared-app/interfaces';
import { TimesheetFilterConfig } from './timesheet-filter-config.interface';
import { FilterSheetWrapperComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-timesheet-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-timesheet-filter
      [missions]="data.missions" 
      [users]="data.users"
      [filter]="data.filter" 
      [disabledFilters]="data.disabledFilters"
      (filterChanged)="close($event)">
    </app-timesheet-filter>
  </app-simple-top-nav> 
  `
})
export class TimesheetFilterSheetWrapperComponent extends FilterSheetWrapperComponent {

  constructor(
    _bottomSheetRef: MatBottomSheetRef<TimesheetFilterSheetWrapperComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: TimesheetFilterConfig) { 
    super(_bottomSheetRef) 
  }

}
