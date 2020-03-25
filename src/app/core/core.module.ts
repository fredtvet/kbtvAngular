import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor } from './interceptors';

import {
  AuthGuard,
  NoAuthGuard,
  UsersService,
  JwtService,
  RolesService,
  ApiService,
  IdentityService,
  LoadingService,
  NotificationService,
  EmployerService,
  MissionTypeService,
  ReportTypeService,
  ConnectionService,
  DataSyncService,
  TranslationService,
  SessionService,
  TimesheetService,
  BottomSheetActionHubService,
} from './services';

import { NotificationComponent } from '../shared/components';

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
    UsersService,
    RolesService,
    JwtService,
    ConnectionService,
    IdentityService,
    AuthGuard,
    NoAuthGuard,
    ApiService,
    LoadingService,
    NotificationService,
    EmployerService,
    MissionTypeService,
    ReportTypeService,
    TimesheetService,
    DataSyncService,
    TranslationService,
    SessionService,
    BottomSheetActionHubService
  ]
})
export class CoreModule { }
