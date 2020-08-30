import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService, NotificationType } from '../services/notification';

interface AppErrorResponse {
  status: number;
  title: string;
  type: string;

  detail?: string;
  errors?: { [key: string]: string[] };
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { console.log("HttpErrorInterceptor"); }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) { 
        var error = err.error as AppErrorResponse;
        this.notificationService.notify({ 
          title: error.detail || error.title || "Noe gikk feil! Vennligst prøv igjen.",  
          details: this.convertErrorsToStringArray(error.errors),
          type: NotificationType.Error
        });
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
}
