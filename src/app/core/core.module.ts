import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRefreshTokenInterceptor, HttpLoadingInterceptor, HttpErrorInterceptor, HttpIsOnlineInterceptor, HttpQueueInterceptor } from './interceptors';


@NgModule({
  declarations: [],
  imports: [],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },   
    { provide: HTTP_INTERCEPTORS, useClass: HttpQueueInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefreshTokenInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: HttpIsOnlineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
  ]
})
export class CoreModule { 
}
