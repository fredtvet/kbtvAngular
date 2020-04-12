import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MissionService } from 'src/app/core/services';
import { TimesheetListFilter } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-list-filter-wrapper',
  template: `
  <app-timesheet-list-filter 
  [missions]="missions$ | async" 
  [filterPreset]="filterPreset" 
  (filterChanged)="updateFilter($event)">
  </app-timesheet-list-filter>
  `
})
export class TimesheetListFilterWrapperComponent implements OnInit {

  missions$ = this._missionService.getAll$();

  constructor(    
    private _missionService: MissionService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetListFilterWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public filterPreset: TimesheetListFilter) { }

  ngOnInit() {
  }

  updateFilter(filter: TimesheetListFilter){
    this._bottomSheetRef.dismiss(filter);
  }

}
