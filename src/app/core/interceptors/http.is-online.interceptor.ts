import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { DeviceInfoService } from "../services/device-info.service";
import { throwError, Observable } from "rxjs";
import { NotificationService } from "../services/ui/notification.service";
import { tap, switchMap } from 'rxjs/operators';
import { Notifications } from 'src/app/shared-app/enums';

@Injectable()
export class HttpIsOnlineInterceptor implements HttpInterceptor {

  constructor(
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
      return this.deviceInfoService.isOnline$.pipe(switchMap(isOnline => {
        if(isOnline) return next.handle(request);
        else return this.throwNotOnlineError();
      }))
  }

  private throwNotOnlineError(): Observable<never> {
    return throwError("Denne funksjonen krever internett tilkobling.").pipe(
      tap((next) => {}, (error) =>
          this.notificationService.notify({
            title: error,
            type: Notifications.Error,
          }),
      )
    );
  }
}
