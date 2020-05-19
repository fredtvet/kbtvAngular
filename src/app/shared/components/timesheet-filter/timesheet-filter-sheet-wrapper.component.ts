import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MissionService } from 'src/app/core/services/data/mission/mission.service';
import { TimesheetFilter, SimpleNavConfig, AppButton } from '../../interfaces';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { Mission } from '../../models/mission.model';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-timesheet-filter
      [missions]="missions$ | async" 
      [users]="users$ | async"
      [filterPreset]="data.filter" 
      [disabledFilters]="data.disabledFilters"
      (filterChanged)="updateFilter($event)">
    </app-timesheet-filter>
  </app-simple-top-nav> 
  `
})
export class TimesheetFilterSheetWrapperComponent implements OnInit {

  missions$: Observable<Mission[]>;
  users$: Observable<User[]>;

  navConfig: SimpleNavConfig;

  constructor(    
    private _missionService: MissionService,
    private _userService: UserService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetFilterSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {filter: TimesheetFilter, disabledFilters:string[]}) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Velg filtre',  
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    };

    this.initalizeObservables();
  }

  updateFilter = (filter: TimesheetFilter) => this.close(filter)
  
  private close = (filter?: TimesheetFilter) => this._bottomSheetRef.dismiss(filter)

  private initalizeObservables(){
    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("mission")) {
      this.missions$ = this._missionService.getAll$();
    }
    else this.missions$ =  of([]);

    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("user")){
        this.users$ = this._userService.getAll$();
    } 
    else this.users$ =  of([]);  
  }

}
