import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, HttpLoadingInterceptor } from './interceptors';

import {
  AuthGuard,
  UsersService,
  EmployersService,
  JwtService,
  MissionNotesService,
  MissionTypesService,
  MissionListService,
  MissionsService,
  RolesService,
  ApiService,
  IdentityService,
  LoadingService,
  MissionReportTypesService,

} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    MissionsService,
    MissionTypesService,
    MissionReportTypesService,
    EmployersService,
    UsersService,
    MissionNotesService,
    MissionListService,
    RolesService,
    JwtService,
    IdentityService,
    AuthGuard,
    ApiService,
    LoadingService
  ]
})
export class CoreModule { }
