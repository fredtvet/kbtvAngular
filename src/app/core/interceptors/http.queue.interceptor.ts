import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, race, Subject, throwError } from "rxjs";
import {
    catchError,
    filter, first,
    switchMap,
    tap
} from "rxjs/operators";
import { ApiUrl } from "../api-url.enum";
import { IgnoreQueueCommands } from '../config/ignore-queue-routes.config';

@Injectable()
export class HttpQueueInterceptor implements HttpInterceptor {
  private queueCount = 0;

  private idQueueSubject = new BehaviorSubject<number>(0);
  private idQueue$ = this.idQueueSubject.asObservable();

  private cancelRequests = new Subject<boolean>();
  private cancelRequest$ = this.cancelRequests.asObservable();

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log(request);
    if (request.responseType != "json" || request.method === "GET" || request.url.includes("/refresh"))
      return next.handle(request);
    let myId = this.queueCount;
    this.queueCount++;

    console.log(myId, this.queueCount);
    return race(
        this.cancelRequest$, 
        this.idQueue$.pipe(first((x) => x === myId))
    ).pipe(
      switchMap(cancel => cancel === true ? EMPTY : next.handle(request)),
      catchError(err => this.onError(err)), tap(x => console.log('before', request)),
      filter((x) => x instanceof HttpResponse), tap(x => console.log('after', request)), //Dont respond to inital status request
      tap(x => this.idQueueSubject.next(myId + 1)) //Add next id to queue
    );
  }

  private onError(err: any): Observable<any> {
    this.cancelRequests.next(true);
    this.queueCount = 0;
    this.idQueueSubject.next(0);
    return throwError(err)
  }

}
