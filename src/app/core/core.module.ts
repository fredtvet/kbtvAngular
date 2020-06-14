import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRefreshTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor } from './interceptors';

import {
  AuthGuard,
  NoAuthGuard,
  UserService,
  IdentityTokensService,
  RoleService,
  ApiService,
  AuthService,
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
  DownloaderService,
  ArrayHelperService,
  RolePreloadService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    UserService,
    RoleService,
    IdentityTokensService,
    DeviceInfoService,
    AuthService,
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
    ArrayHelperService,
    RolePreloadService
  ]
})
export class CoreModule { }
