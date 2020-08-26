import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FilterSheetWrapperComponent } from 'src/app/shared/components';
import { WeekFilterConfig } from './week-filter-config.interface';

@Component({
  selector: 'app-week-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-week-filter 
      [config]="data"
      (filterChanged)="close($event)">
    </app-week-filter>
  </app-simple-top-nav> 
  `
})
export class WeekFilterSheetWrapperComponent extends FilterSheetWrapperComponent {

  constructor(
    _bottomSheetRef: MatBottomSheetRef<WeekFilterSheetWrapperComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: WeekFilterConfig) { 
    super(_bottomSheetRef) 
  }

}
