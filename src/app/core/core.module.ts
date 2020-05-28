import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor } from './interceptors';

import {
  AuthGuard,
  NoAuthGuard,
  UserService,
  JwtService,
  RoleService,
  ApiService,
  IdentityService,
  LoadingService,
  NotificationService,
  EmployerService,
  MissionTypeService,
  DocumentTypeService,
  DeviceInfoService,
  DataSyncService,
  TranslationService,
  UserTimesheetService,
  DateTimeService,
  MainNavService,
  TimesheetService,
  TimesheetAggregatorService,
  AppConfigurationService,
  DownloaderService
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
    UserService,
    RoleService,
    JwtService,
    DeviceInfoService,
    IdentityService,
    AuthGuard,
    NoAuthGuard,
    ApiService,
    LoadingService,
    NotificationService,
    EmployerService,
    MissionTypeService,
    DocumentTypeService,
    UserTimesheetService,
    TimesheetService,
    DataSyncService,
    TranslationService,
    DateTimeService,
    MainNavService,
    TimesheetAggregatorService,
    AppConfigurationService,
    DownloaderService,
  ]
})
export class CoreModule { }
