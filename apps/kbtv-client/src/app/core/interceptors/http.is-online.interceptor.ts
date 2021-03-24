import {
  HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, switchMap } from 'rxjs/operators';
import { DeviceInfoService } from "../services/device-info.service";

@Injectable()
export class HttpIsOnlineInterceptor implements HttpInterceptor {

  constructor(private deviceInfoService: DeviceInfoService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if(request.responseType != "json") return next.handle(request);
    return this.deviceInfoService.isOnline$.pipe(
      first(x => x === true),
      switchMap(x => next.handle(request))
    );
  }

}
