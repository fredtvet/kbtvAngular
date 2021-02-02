import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { ApiUrl } from '@core/api-url.enum';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    private totalCommandRequests = 0;
    private totalQueryRequests = 0;

    private ignoredCommands: string[] = ["/refresh", "/SyncAll"]

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler) {   
      if(request.responseType != "json") return next.handle(request);
      if(request.method === "GET"){
        this.totalQueryRequests++;
        this.loadingService.setQueryLoading(true);
        return next.handle(request).pipe(finalize(() => this.decreaseQueryRequests()));
      } else {
        this.totalCommandRequests++;
        this.loadingService.setCommandLoading(true);
        return next.handle(request).pipe(finalize(() => this.decreaseCommandRequests()));
      }
    }  

    private decreaseCommandRequests() {
      this.totalCommandRequests--;
      if (this.totalCommandRequests === 0) {
        this.loadingService.setCommandLoading(false);
      }
    }

    private decreaseQueryRequests() {
      this.totalQueryRequests--;
      if (this.totalQueryRequests === 0) {
        this.loadingService.setQueryLoading(false);
      }
    }
}
