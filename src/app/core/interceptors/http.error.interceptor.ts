import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { NOTIFICATIONS } from 'src/app/shared/notifications.enum';
import { Router } from '@angular/router';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        let msg = "Noe gikk feil! Vennligst prøv igjen."
        switch(err.status){
          case 401: //Unauthorized
            msg = "Feil brukernavn eller passord."
            break;
          case 403: //Forbidden
            msg = "Du har ikke tilgang til denne funksjonen."
            break;
          case 404: //NotFound
            msg = "Denne ressursen finnes ikke!"
            this.router.navigate(['/hjem'])
            break;
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
            msg = "Noe gikk feil på vår side. Prøv igjen senere eller ta kontakt."
            break;
          default:
            break;
        }
        this.notificationService.setNotification(msg, NOTIFICATIONS.Error);
      }
    }));
  }
}
