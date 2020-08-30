import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    private totalCommandRequests = 0;
    private totalQueryRequests = 0;

    constructor(private loadingService: LoadingService) { console.log("HttpLoadingInterceptor");}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      console.log(request);
      if(request.method === "GET"){
        this.totalQueryRequests++;
        this.loadingService.setQueryLoading(true);
        return next.handle(request).pipe(finalize(() => this.decreaseQueryRequests()));
      } else {
        this.totalCommandRequests++;
        this.loadingService.setCommandLoading(true);
        return next.handle(request).pipe(finalize(() => this.decreaseCommandRequests()));
      }
        // tap(res => {
        //   if (res instanceof HttpResponse) {
        //     this.decreaseRequests();
        //   }
        // }),
        // catchError(err => {
        //   this.decreaseRequests(); 
        //   throw err;
        // })
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
