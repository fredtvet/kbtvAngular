import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private _location: Location
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        let msg = "Noe gikk feil! Vennligst prøv igjen."
        switch(err.status){
          case 404: //NotFound
            msg = "Denne ressursen finnes ikke!"
            this._location.back();
            break;
          case 403: //Forbidden
            msg = "Denne operasjonen er forbudt!"
            break;
          case 401: //Unauthorized
            msg = "Feil brukernavn eller passord!"
            break;
        }
        this.notificationService.setNotification(msg);
      }
    }));
  }
}
