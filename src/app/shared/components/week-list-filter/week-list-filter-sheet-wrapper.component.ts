import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-week-list-filter-sheet-wrapper',
  template: `
  <app-week-list-filter 
  [year]="data.year" 
  [users]="users$ | async"
  [userName]="data.userName"
  (filterChanged)="updateFilter($event)">
  </app-week-list-filter>
  `
})
export class WeekListFilterSheetWrapperComponent {

  users$: Observable<User[]>;

  constructor(    
    private _bottomSheetRef: MatBottomSheetRef<WeekListFilterSheetWrapperComponent>, 
    private _usersService: UsersService, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {year: number, userName?: string}) { }

  ngOnInit(): void {
    if(this.data.userName !== undefined){
      this.users$ = this._usersService.getAll$();
    } 
    else this.users$ =  of([]);  
  }

  updateFilter(filter: {year: number, username?: string}){
    this._bottomSheetRef.dismiss(filter);
  }

}
