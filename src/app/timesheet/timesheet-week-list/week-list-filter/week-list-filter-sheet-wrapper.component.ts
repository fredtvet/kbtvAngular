import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-week-list-filter-sheet-wrapper',
  template: `
  <app-week-list-filter 
  [year]="data.year" 
  (filterChanged)="updateFilter($event)">
  </app-week-list-filter>
  `
})
export class WeekListFilterSheetWrapperComponent {

  constructor(    
    private _bottomSheetRef: MatBottomSheetRef<WeekListFilterSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {year: number}) { }


  updateFilter(filter: {year: number}){
    this._bottomSheetRef.dismiss(filter);
  }

}
