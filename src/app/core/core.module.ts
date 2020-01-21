import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http.token.interceptor';

import {
  AuthGuard,
  UsersService,
  EmployersService,
  JwtService,
  MissionImagesService,
  MissionNotesService,
  MissionReportsService,
  MissionTypesService,
  MissionsService,
  RolesService,
  ApiService,
  IdentityService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    MissionsService,
    MissionTypesService,
    EmployersService,
    UsersService,
    MissionImagesService,
    MissionNotesService,
    MissionReportsService,
    RolesService,
    JwtService,
    IdentityService,
    AuthGuard,
    ApiService
  ]
})
export class CoreModule { }
