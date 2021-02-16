import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { httpRetryStrategy } from "@core/http-retry.strategy";
import { retryWhen } from "rxjs/operators";

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
        retryWhen(httpRetryStrategy({excludedStatusCodes: [400, 401, 403]}))
    )
  }

}
