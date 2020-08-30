import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FilterSheetWrapperComponent } from 'src/app/shared/components';
import { TimesheetFilterConfig } from './timesheet-filter-config.interface';

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
