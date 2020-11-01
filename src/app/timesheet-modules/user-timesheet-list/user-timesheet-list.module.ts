import { NgModule } from '@angular/core';
import { SaveUserTimesheetHttpEffect } from '../shared-timesheet/save-user-timesheet/save-user-timesheet.http.effect';
import { SaveUserTimesheetReducer } from '../shared-timesheet/save-user-timesheet/save-user-timesheet.reducer';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { UserTimesheetListRoutingModule } from './user-timesheet-list-routing.module';
import { UserTimesheetListViewComponent } from './user-timesheet-list/user-timesheet-list-view/user-timesheet-list-view.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';

@NgModule({
  declarations: [
    UserTimesheetListComponent,
    UserTimesheetListViewComponent,
  ],
  providers:[],
  imports: [
    SharedTimesheetModule,
    UserTimesheetListRoutingModule
  ]
})
export class UserTimesheetListModule {
  constructor(
    saveUserTimesheetReducer: SaveUserTimesheetReducer, 
    saveUserTimesheetHttpEffect: SaveUserTimesheetHttpEffect
  ){}
}
