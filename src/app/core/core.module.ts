import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRefreshTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor } from './interceptors';

import {
  AuthGuard,
  NoAuthGuard,
  UserService,
  IdentityTokensService,
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
  DownloaderService,
  ArrayHelperService,
  RolePreloadService,
  CssLoaderService,
  JsonToCsvExportService
} from './services';
import { InboundEmailPasswordService } from './services/data/inbound-email-password/inbound-email-password.service';

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
    DownloaderService,
    ArrayHelperService,
    RolePreloadService,
    CssLoaderService,
    JsonToCsvExportService,
    InboundEmailPasswordService
  ]
})
export class CoreModule { }
