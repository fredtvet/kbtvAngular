import {
  HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, race, throwError, timer } from "rxjs";
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DeviceInfoService } from "../services/device-info.service";
import { NotificationService, NotificationType } from '../services/notification';

@Injectable()
export class HttpIsOnlineInterceptor implements HttpInterceptor {

  constructor(
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return race(
      timer(2000).pipe(map(x => false)), //Emits false after x time IF no indication of online
      this.deviceInfoService.isOnline$.pipe(first(x => x ===true))
    ).pipe(switchMap(isOnline => {
        if(isOnline || request.responseType != "json") return next.handle(request); //Not showing errors for static content etc.
        else return this.throwNotOnlineError();
    }));
  }

  private throwNotOnlineError(): Observable<never> {
    return throwError("Får ikke koblet til internett. Eventuelle endringer er reversert.").pipe(
      tap((next) => {}, (error) =>
          this.notificationService.notify({
            title: error,
            type: NotificationType.Error,
          }),
      )
    );
  }
}
