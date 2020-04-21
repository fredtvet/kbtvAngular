import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MissionService } from 'src/app/core/services/data/mission.service';
import { TimesheetFilter } from '../../interfaces';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { Mission } from '../../models/mission.model';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-filter-sheet-wrapper',
  template: `
  <app-timesheet-filter 
  [missions]="missions$ | async" 
  [users]="users$ | async"
  [filterPreset]="data.filter" 
  [disabledFilters]="data.disabledFilters"
  (filterChanged)="updateFilter($event)">
  </app-timesheet-filter>
  `
})
export class TimesheetFilterSheetWrapperComponent implements OnInit {

  missions$: Observable<Mission[]>;
  users$: Observable<User[]>;

  constructor(    
    private _missionService: MissionService,
    private _usersService: UsersService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetFilterSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {filter: TimesheetFilter, disabledFilters:string[]}) { }

  ngOnInit() {
    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("mission")) {
        this.missions$ = this._missionService.getAll$();
    }
    else this.missions$ =  of([]);

    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("user")){
        this.users$ = this._usersService.getAll$();
    } 
    else this.users$ =  of([]);  
  }

  updateFilter(filter: TimesheetFilter){
    this._bottomSheetRef.dismiss(filter);
  }

}
