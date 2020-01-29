import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor } from './interceptors';

import {
  AuthGuard,
  UsersService,
  EmployersService,
  JwtService,
  MissionTypesService,
  MissionListService,
  MissionsService,
  RolesService,
  ApiService,
  IdentityService,
  LoadingService,
  MissionReportTypesService,
  NotificationService,

} from './services';
import { NotificationComponent } from '../shared/components/notification/notification.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  entryComponents:[
    NotificationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    MissionsService,
    MissionTypesService,
    MissionReportTypesService,
    EmployersService,
    UsersService,
    MissionListService,
    RolesService,
    JwtService,
    IdentityService,
    AuthGuard,
    ApiService,
    LoadingService,
    NotificationService
  ]
})
export class CoreModule { }
