import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRefreshTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor, HttpIsOnlineInterceptor } from './interceptors';

import {
  AuthGuard,
  NoAuthGuard,
  ApiService,
  AuthStore,
  LoadingService,
  NotificationService,
  DeviceInfoService,
  DateTimeService,
  MainNavService,
  TimesheetSummaryAggregator,
  DownloaderService,
  ArrayHelperService,
  RolePreloadService,
  CssLoaderService,
  SorterService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefreshTokenInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthStore,
    DeviceInfoService,
    AuthGuard,
    NoAuthGuard,
    ApiService,
    LoadingService,
    NotificationService,
    DateTimeService,
    MainNavService,
    TimesheetSummaryAggregator,
    DownloaderService,
    ArrayHelperService,
    SorterService,
    RolePreloadService,
    CssLoaderService, 
  ]
})
export class CoreModule { }
