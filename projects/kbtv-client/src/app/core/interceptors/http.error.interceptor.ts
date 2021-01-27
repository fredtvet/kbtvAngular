import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppNotifications } from '@shared-app/app-notifications.const';
import { Maybe } from 'global-types';
import { AppNotification, NotificationService } from 'notification';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AppErrorResponse {
  status: number;
  title: string;
  type: string;

  detail?: string;
  errors?: { [key: string]: string[] };
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.responseType != "json") return next.handle(request);
    return next.handle(request).pipe(tap(() => {},
      (err: unknown) => { 
      if (err instanceof HttpErrorResponse) { 
        var notification: Maybe<AppNotification> = null;

        if(err.status === 504) 
          notification = AppNotifications.error({title: 'Får ikke konkakt med serveren. Vennligst prøv igjen.'})

        var error = err.error as AppErrorResponse;

        if(error)
          notification = AppNotifications.error({
            title: error.detail || error.title || "En ukjent feil oppsto! Vennligst prøv igjen.",
            details: error.errors ? this.convertErrorsToStringArray(error.errors) : undefined,
            duration: this.calculateDuration(error.errors)
          })
        
        if(!notification) 
          notification = AppNotifications.error({title: "En ukjent feil oppsto! Vennligst prøv igjen."})

        this.notificationService.notify(notification);
      }
    }));
  }

  private convertErrorsToStringArray(errors: { [key: string]: string[] }): string[]{
    let result: string[] = [];
    for(var key in errors){
      result = result.concat(errors[key]);
    }
    return result;
  }

  private calculateDuration(errors: Maybe<{ [key: string]: string[] }>): number{
    const minValue = 5000;
    const value = Object.keys(errors || {}).length * 2500;
    return minValue > value ? minValue : value;
  }
}
