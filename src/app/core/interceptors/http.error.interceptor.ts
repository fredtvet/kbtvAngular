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
import { NotificationService } from '../services/ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {   
        let msg = "Noe gikk feil! Vennligst prøv igjen."
        switch(err.status){
          case 0: 
            msg = "Får ikke kontakt med serveren."
            break;
          case 401: //Unauthorized
            msg = "Feil brukernavn eller passord."
            break;
          case 403: //Forbidden
            msg = "Du har ikke tilgang til denne funksjonen."
            break;
          case 404: //NotFound
            msg = "Denne ressursen finnes ikke."
            break;
          case 408: //Request timeout
            msg = "Får ikke kontakt med serveren."
            break;
          // case 500:
          // case 501:
          // case 502:
          // case 503:
          case 504:
            msg = "Noe gikk feil på serveren."
            break;
          default:
            break;
        }
        this.notificationService.setNotification(msg, Notifications.Error);
      }
    }));
  }
}
