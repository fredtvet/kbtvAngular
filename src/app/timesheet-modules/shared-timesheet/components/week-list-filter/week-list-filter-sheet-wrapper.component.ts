import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, of, EMPTY } from 'rxjs';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/core/models';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-week-list-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-week-list-filter 
    [year]="data.year" 
    [users]="users$ | async"
    [userName]="data.userName"
    (filterChanged)="updateFilter($event)">
    </app-week-list-filter>
  </app-simple-top-nav> 
  `
})
export class WeekListFilterSheetWrapperComponent {

  users$: Observable<User[]>;

  navConfig: SimpleNavConfig;

  constructor(    
    private _bottomSheetRef: MatBottomSheetRef<WeekListFilterSheetWrapperComponent>, 
    private _userService: UserService, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {year: number, userName?: string}) { }

  ngOnInit(): void {
    this.navConfig = {
      title: 'Velg filtre',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    };

    if(this.data.userName !== undefined){
      this.users$ = this._userService.getAll$();
    } 
    else this.users$ =  EMPTY;  
  }

  updateFilter = (filter: {year: number, username?: string}) => this.close(filter)
  
  private close = (filter?: {year: number, username?: string}) => this._bottomSheetRef.dismiss(filter)
}
