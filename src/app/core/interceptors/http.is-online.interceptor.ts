import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { DeviceInfoService } from "../services/device-info.service";
import { throwError, Observable } from "rxjs";
import { tap, switchMap, take } from 'rxjs/operators';
import { NotificationType, NotificationService } from '../services/notification';

@Injectable()
export class HttpIsOnlineInterceptor implements HttpInterceptor {

  constructor(
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService
  ) {console.log("HttpIsOnlineInterceptor");}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
      return this.deviceInfoService.isOnline$.pipe(take(1), switchMap(isOnline => {
        if(isOnline) return next.handle(request);
        else return this.throwNotOnlineError();
      }))
  }

  private throwNotOnlineError(): Observable<never> {
    return throwError("Denne funksjonen krever internett tilkobling.").pipe(
      tap((next) => {}, (error) =>
          this.notificationService.notify({
            title: error,
            type: NotificationType.Error,
          }),
      )
    );
  }
}
